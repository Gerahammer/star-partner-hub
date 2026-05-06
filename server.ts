import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';
import { randomUUID } from 'crypto';
import multer from 'multer';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const DATABASE_URL = process.env.DATABASE_URL;

// DigitalOcean Spaces (S3-compatible)
const DO_SPACES_KEY = process.env.DO_SPACES_KEY;
const DO_SPACES_SECRET = process.env.DO_SPACES_SECRET;
const DO_SPACES_BUCKET = process.env.DO_SPACES_BUCKET;
const DO_SPACES_REGION = process.env.DO_SPACES_REGION || 'fra1';
const DO_SPACES_ENDPOINT = process.env.DO_SPACES_ENDPOINT || `https://${DO_SPACES_REGION}.digitaloceanspaces.com`;
const DO_SPACES_CDN = process.env.DO_SPACES_CDN; // optional CDN URL like https://my-bucket.fra1.cdn.digitaloceanspaces.com

// Database setup - PostgreSQL
if (!DATABASE_URL) {
  console.error('FATAL: DATABASE_URL environment variable is required');
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

// Initialize database schema
async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id UUID PRIMARY KEY,
        site_name TEXT NOT NULL,
        content TEXT NOT NULL,
        site_url TEXT,
        logo_url TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log('✓ Database schema initialized');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

interface Testimonial {
  id: string;
  site_name: string;
  content: string;
  site_url: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

// S3 Client for DigitalOcean Spaces
const s3Client = (DO_SPACES_KEY && DO_SPACES_SECRET) ? new S3Client({
  endpoint: DO_SPACES_ENDPOINT,
  region: DO_SPACES_REGION,
  credentials: {
    accessKeyId: DO_SPACES_KEY,
    secretAccessKey: DO_SPACES_SECRET,
  },
  forcePathStyle: false,
}) : null;

function buildPublicLogoUrl(key: string): string {
  if (DO_SPACES_CDN) {
    return `${DO_SPACES_CDN.replace(/\/$/, '')}/${key}`;
  }
  return `${DO_SPACES_ENDPOINT}/${DO_SPACES_BUCKET}/${key}`;
}

function extractKeyFromLogoUrl(url: string): string | null {
  if (!url || !DO_SPACES_BUCKET) return null;
  // Match patterns like https://endpoint/bucket/key or https://cdn/key
  const bucketPattern = new RegExp(`/${DO_SPACES_BUCKET}/(.+)$`);
  const m = url.match(bucketPattern);
  if (m) return m[1];
  // CDN style: just take pathname
  try {
    const u = new URL(url);
    return u.pathname.replace(/^\//, '');
  } catch {
    return null;
  }
}

// Rate limiting: store IP -> array of timestamps
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true
}));

// Serve static files from dist (frontend build)
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// Utility functions
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function getClientIP(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const ip = typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0];
    return ip.trim();
  }

  const realIP = req.headers['x-real-ip'];
  if (realIP) {
    return typeof realIP === 'string' ? realIP : realIP[0];
  }

  return req.ip || 'unknown';
}

function checkRateLimit(ipAddress: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  if (!rateLimitStore.has(ipAddress)) {
    rateLimitStore.set(ipAddress, []);
  }

  let timestamps = rateLimitStore.get(ipAddress)!;
  timestamps = timestamps.filter(ts => ts > windowStart);
  rateLimitStore.set(ipAddress, timestamps);

  const requestCount = timestamps.length;
  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - requestCount);

  return {
    allowed: requestCount < RATE_LIMIT_MAX_REQUESTS,
    remaining
  };
}

function recordRateLimit(ipAddress: string): void {
  if (!rateLimitStore.has(ipAddress)) {
    rateLimitStore.set(ipAddress, []);
  }
  const timestamps = rateLimitStore.get(ipAddress)!;
  timestamps.push(Date.now());
  rateLimitStore.set(ipAddress, timestamps);
}

function checkAdminPassword(req: Request): boolean {
  const password = req.headers['x-admin-password'];
  return !!ADMIN_PASSWORD && password === ADMIN_PASSWORD;
}

// Configure multer for in-memory uploads (we then push to Spaces)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req: any, file: any, cb: any) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed'));
    } else {
      cb(null, true);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

async function sendTelegramMessage(
  name: string,
  email: string,
  company: string,
  telegram: string,
  teams: string,
  message: string
): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured');
    return false;
  }

  try {
    const telegramMessage = `
📬 <b>New Partnership Inquiry</b>

👤 <b>Name:</b> ${escapeHtml(name)}
📧 <b>Email:</b> ${escapeHtml(email)}
${company ? `🏢 <b>Company:</b> ${escapeHtml(company)}` : ''}
${telegram ? `📱 <b>Telegram:</b> ${escapeHtml(telegram)}` : ''}
${teams ? `💼 <b>Teams:</b> ${escapeHtml(teams)}` : ''}

💬 <b>Message:</b>
${escapeHtml(message)}
    `.trim();

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Telegram API error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}

// Routes
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/auth/check-password', (req: Request, res: Response) => {
  if (checkAdminPassword(req)) {
    res.json({ valid: true, message: 'Password is correct' });
  } else {
    res.status(401).json({ valid: false, error: 'Invalid password' });
  }
});

app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, company, telegram, teams, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required',
        message: 'Please fill in all required fields'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email address',
        message: 'Please enter a valid email address'
      });
    }

    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return res.status(429).json({
        error: 'Too many requests',
        message: 'Please try again later. Maximum 5 requests per hour.'
      });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : '';
    const safeTelegram = telegram ? escapeHtml(telegram) : '';
    const safeTeams = teams ? escapeHtml(teams) : '';
    const safeMessage = escapeHtml(message);

    console.log(`Processing contact form from ${clientIP}: ${safeName} <${safeEmail}>`);

    const telegramSent = await sendTelegramMessage(
      safeName, safeEmail, safeCompany, safeTelegram, safeTeams, safeMessage
    );

    recordRateLimit(clientIP);

    if (!telegramSent) {
      console.error('Telegram notification failed');
      return res.status(500).json({
        error: 'Failed to send notification',
        message: 'Unable to process your inquiry at this time'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message received successfully',
      remaining: rateLimit.remaining - 1
    });
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      error: 'Failed to process request',
      message: error.message || 'An error occurred while processing your request'
    });
  }
});

// Testimonials routes
app.get('/api/testimonials', async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Testimonial>(
      'SELECT id, site_name, content, site_url, logo_url, created_at, updated_at FROM testimonials ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

app.post('/api/testimonials', async (req: Request, res: Response) => {
  try {
    if (!checkAdminPassword(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { site_name, content, site_url, logo_url } = req.body;

    if (!site_name || !content) {
      return res.status(400).json({ error: 'site_name and content are required' });
    }

    const id = randomUUID();
    const result = await pool.query<Testimonial>(
      `INSERT INTO testimonials (id, site_name, content, site_url, logo_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, site_name, content, site_url, logo_url, created_at, updated_at`,
      [id, site_name, content, site_url || null, logo_url || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

app.put('/api/testimonials/:id', async (req: Request, res: Response) => {
  try {
    if (!checkAdminPassword(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const { site_name, content, site_url, logo_url } = req.body;

    if (!site_name || !content) {
      return res.status(400).json({ error: 'site_name and content are required' });
    }

    const result = await pool.query<Testimonial>(
      `UPDATE testimonials
       SET site_name = $1, content = $2, site_url = $3, logo_url = $4, updated_at = NOW()
       WHERE id = $5
       RETURNING id, site_name, content, site_url, logo_url, created_at, updated_at`,
      [site_name, content, site_url || null, logo_url || null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

app.delete('/api/testimonials/:id', async (req: Request, res: Response) => {
  try {
    if (!checkAdminPassword(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    // First, fetch the testimonial to get the logo URL for cleanup
    const fetchResult = await pool.query<{ logo_url: string | null }>(
      'SELECT logo_url FROM testimonials WHERE id = $1',
      [id]
    );

    if (fetchResult.rowCount === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    const logoUrl = fetchResult.rows[0].logo_url;

    // Delete the row
    await pool.query('DELETE FROM testimonials WHERE id = $1', [id]);

    // Best-effort: delete the logo from Spaces (don't fail if this errors)
    if (logoUrl && s3Client && DO_SPACES_BUCKET) {
      const key = extractKeyFromLogoUrl(logoUrl);
      if (key && key.startsWith('logos/')) {
        try {
          await s3Client.send(new DeleteObjectCommand({
            Bucket: DO_SPACES_BUCKET,
            Key: key,
          }));
        } catch (err) {
          console.warn('Failed to delete logo from Spaces:', err);
        }
      }
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// File upload endpoint - uploads to DigitalOcean Spaces
app.post('/api/testimonials/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!checkAdminPassword(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    if (!s3Client || !DO_SPACES_BUCKET) {
      return res.status(500).json({
        error: 'Storage not configured',
        message: 'DigitalOcean Spaces credentials are missing'
      });
    }

    const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
    const key = `logos/${randomUUID()}${ext}`;

    await s3Client.send(new PutObjectCommand({
      Bucket: DO_SPACES_BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
      CacheControl: 'public, max-age=31536000',
    }));

    const url = buildPublicLogoUrl(key);
    res.json({ url });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: error.message || 'Failed to upload file' });
  }
});

// Serve index.html for all other routes (SPA fallback)
if (NODE_ENV === 'production') {
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: NODE_ENV === 'production' ? 'An error occurred' : err.message
  });
});

// Start server after DB init
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} (${NODE_ENV} mode)`);
    if (s3Client && DO_SPACES_BUCKET) {
      console.log(`✓ DigitalOcean Spaces configured (bucket: ${DO_SPACES_BUCKET})`);
    } else {
      console.warn('⚠ DigitalOcean Spaces NOT configured - logo uploads will fail');
    }
    if (NODE_ENV === 'development') {
      console.log(`   API: http://localhost:${PORT}/api/contact`);
      console.log(`   Health: http://localhost:${PORT}/health`);
    }
  });
});
