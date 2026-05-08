import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';
import { randomUUID, timingSafeEqual } from 'crypto';
import multer from 'multer';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { fileTypeFromBuffer } from 'file-type';
import { z } from 'zod';

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
const DO_SPACES_CDN = process.env.DO_SPACES_CDN;

// Database setup - PostgreSQL
if (!DATABASE_URL) {
  console.error('FATAL: DATABASE_URL environment variable is required');
  process.exit(1);
}

// Strip sslmode from URL so the pg-connection-string parser doesn't override our ssl config.
const cleanedDbUrl = (() => {
  try {
    const u = new URL(DATABASE_URL);
    u.searchParams.delete('sslmode');
    return u.toString();
  } catch {
    return DATABASE_URL;
  }
})();

const pool = new Pool({
  connectionString: cleanedDbUrl,
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle Postgres client:', err);
});

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

// Only allow deleting objects under our logos/ prefix that match a UUID-named file
const LOGO_KEY_PATTERN = /^logos\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[a-z0-9]{1,5}$/i;

function safeKeyFromLogoUrl(url: string): string | null {
  if (!url || !DO_SPACES_BUCKET) return null;
  let candidate: string | null = null;
  const bucketPattern = new RegExp(`/${DO_SPACES_BUCKET}/(.+)$`);
  const m = url.match(bucketPattern);
  if (m) {
    candidate = m[1];
  } else {
    try {
      const u = new URL(url);
      candidate = u.pathname.replace(/^\//, '');
    } catch {
      return null;
    }
  }
  return candidate && LOGO_KEY_PATTERN.test(candidate) ? candidate : null;
}

// Middleware
app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: false, // disabled for the SPA; tighten later if needed
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(express.json({ limit: '256kb' }));
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',').map(s => s.trim()) || ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
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

function checkAdminPassword(req: Request): boolean {
  const password = req.headers['x-admin-password'];
  if (!ADMIN_PASSWORD || typeof password !== 'string' || password.length === 0) {
    return false;
  }
  const a = Buffer.from(password);
  const b = Buffer.from(ADMIN_PASSWORD);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function adminOnly(req: Request, res: Response, next: NextFunction) {
  if (!checkAdminPassword(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Rate limiters
// Layer 1: very strict short-window cooldown — at most 1 contact per IP per 60s
const contactCooldown = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too soon', message: 'Please wait at least a minute before sending another message.' },
});
// Layer 2: hourly cap — at most 5 per IP per hour
const contactHourly = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests', message: 'Please try again later. Maximum 5 messages per hour.' },
});

// Layer 3: per-email + per-content de-duplication (catches IP-rotation spam)
// Stores hash → timestamp; drops requests that match an existing entry within the window
const recentSubmissions = new Map<string, number>();
const DEDUPE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const PER_EMAIL_COOLDOWN_MS = 2 * 60 * 1000; // 2 minutes

function dedupeKey(email: string, message: string): string {
  // Simple hash — small surface, just need a stable, low-collision identifier
  let h = 0;
  const s = `${email.toLowerCase().trim()}|${message.trim().slice(0, 500)}`;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return h.toString(36);
}

function checkSpamGuards(email: string, message: string): { ok: true } | { ok: false; reason: string } {
  const now = Date.now();

  // Garbage-collect expired entries
  for (const [k, ts] of recentSubmissions) {
    if (now - ts > DEDUPE_WINDOW_MS) recentSubmissions.delete(k);
  }

  // 1. Per-email cooldown — block if same email submitted in last 2 min
  const emailKey = `email:${email.toLowerCase().trim()}`;
  const lastFromEmail = recentSubmissions.get(emailKey);
  if (lastFromEmail && now - lastFromEmail < PER_EMAIL_COOLDOWN_MS) {
    return { ok: false, reason: 'per-email-cooldown' };
  }

  // 2. Duplicate-content check — same email+message within 10 min = drop
  const contentKey = `content:${dedupeKey(email, message)}`;
  if (recentSubmissions.has(contentKey)) {
    return { ok: false, reason: 'duplicate-content' };
  }

  // Record both
  recentSubmissions.set(emailKey, now);
  recentSubmissions.set(contentKey, now);
  return { ok: true };
}

const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts', message: 'Too many failed attempts. Try again in 15 minutes.' },
});

const adminMutationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

// Multer in-memory uploads (validated via magic-bytes)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const ALLOWED_IMAGE_MIMES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
};

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

// Validation schemas
const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  telegram: z.string().trim().max(120).optional().or(z.literal('')),
  teams: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(1).max(4000),
});

const testimonialSchema = z.object({
  site_name: z.string().trim().min(1).max(120),
  content: z.string().trim().min(1).max(2000),
  site_url: z.string().trim().url().max(2048).optional().or(z.literal('')).nullable(),
  logo_url: z.string().trim().url().max(2048).optional().or(z.literal('')).nullable(),
});

// Routes
app.get('/health', async (req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', timestamp: new Date().toISOString(), db: 'connected' });
  } catch {
    res.status(503).json({ status: 'degraded', timestamp: new Date().toISOString(), db: 'disconnected' });
  }
});

app.post('/api/auth/check-password', adminAuthLimiter, (req: Request, res: Response) => {
  if (checkAdminPassword(req)) {
    res.json({ valid: true, message: 'Password is correct' });
  } else {
    res.status(401).json({ valid: false, error: 'Invalid password' });
  }
});

app.post('/api/contact', contactCooldown, contactHourly, async (req: Request, res: Response) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Validation failed',
        message: parsed.error.issues[0]?.message ?? 'Invalid input',
      });
    }

    const { name, email, company = '', telegram = '', teams = '', message } = parsed.data;

    // Per-email cooldown + duplicate-content de-dupe (catches IP-rotation spam)
    const guard = checkSpamGuards(email, message);
    if (!guard.ok) {
      console.log(`Contact form blocked by spam guard: ${guard.reason}`);
      if (guard.reason === 'duplicate-content') {
        return res.status(409).json({
          error: 'Duplicate message',
          message: 'You already sent this message recently. Please wait before resending.',
        });
      }
      return res.status(429).json({
        error: 'Too soon',
        message: 'Please wait a couple of minutes before sending another message.',
      });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : '';
    const safeTelegram = telegram ? escapeHtml(telegram) : '';
    const safeTeams = teams ? escapeHtml(teams) : '';
    const safeMessage = escapeHtml(message);

    console.log('Processing contact form');

    const telegramSent = await sendTelegramMessage(
      safeName, safeEmail, safeCompany, safeTelegram, safeTeams, safeMessage
    );

    if (!telegramSent) {
      console.error('Telegram notification failed');
      return res.status(500).json({
        error: 'Failed to send notification',
        message: 'Unable to process your inquiry at this time'
      });
    }

    res.status(200).json({ success: true, message: 'Message received successfully' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing contact form:', msg);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Testimonials routes
app.get('/api/testimonials', async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Testimonial>(
      'SELECT id, site_name, content, site_url, logo_url, created_at, updated_at FROM testimonials ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching testimonials:', msg);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

app.post('/api/testimonials', adminMutationLimiter, adminOnly, async (req: Request, res: Response) => {
  try {
    const parsed = testimonialSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' });
    }
    const { site_name, content, site_url, logo_url } = parsed.data;

    const id = randomUUID();
    const result = await pool.query<Testimonial>(
      `INSERT INTO testimonials (id, site_name, content, site_url, logo_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, site_name, content, site_url, logo_url, created_at, updated_at`,
      [id, site_name, content, site_url || null, logo_url || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating testimonial:', msg);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

app.put('/api/testimonials/:id', adminMutationLimiter, adminOnly, async (req: Request, res: Response) => {
  try {
    const parsed = testimonialSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' });
    }
    const { site_name, content, site_url, logo_url } = parsed.data;
    const { id } = req.params;

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
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error updating testimonial:', msg);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

app.delete('/api/testimonials/:id', adminMutationLimiter, adminOnly, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const fetchResult = await pool.query<{ logo_url: string | null }>(
      'SELECT logo_url FROM testimonials WHERE id = $1',
      [id]
    );

    if (fetchResult.rowCount === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    const logoUrl = fetchResult.rows[0].logo_url;
    await pool.query('DELETE FROM testimonials WHERE id = $1', [id]);

    if (logoUrl && s3Client && DO_SPACES_BUCKET) {
      const key = safeKeyFromLogoUrl(logoUrl);
      if (key) {
        try {
          await s3Client.send(new DeleteObjectCommand({
            Bucket: DO_SPACES_BUCKET,
            Key: key,
          }));
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : 'Unknown error';
          console.warn('Failed to delete logo from Spaces:', msg);
        }
      }
    }

    res.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error deleting testimonial:', msg);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// File upload endpoint - validates magic bytes and uploads to DO Spaces
app.post('/api/testimonials/upload', adminMutationLimiter, adminOnly, upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    if (!s3Client || !DO_SPACES_BUCKET) {
      return res.status(500).json({
        error: 'Storage not configured',
        message: 'DigitalOcean Spaces credentials are missing'
      });
    }

    // Validate by magic bytes (don't trust client-provided MIME)
    const detected = await fileTypeFromBuffer(req.file.buffer);
    if (!detected || !ALLOWED_IMAGE_MIMES.has(detected.mime)) {
      return res.status(400).json({
        error: 'Invalid file type',
        message: 'Only JPEG, PNG, GIF, and WebP images are allowed',
      });
    }

    const ext = MIME_TO_EXT[detected.mime];
    const key = `logos/${randomUUID()}${ext}`;

    await s3Client.send(new PutObjectCommand({
      Bucket: DO_SPACES_BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: detected.mime,
      ACL: 'public-read',
      CacheControl: 'public, max-age=31536000',
    }));

    res.json({ url: buildPublicLogoUrl(key) });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error uploading file:', msg);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Serve index.html for all other routes (SPA fallback)
if (NODE_ENV === 'production') {
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  // Multer file-size errors
  if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large', message: 'Maximum file size is 5MB' });
  }
  const msg = err instanceof Error ? err.message : 'Unknown error';
  console.error('Unhandled error:', msg);
  res.status(500).json({
    error: 'Internal server error',
    message: NODE_ENV === 'production' ? 'An error occurred' : msg,
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing pool…');
  await pool.end().catch(() => {});
  process.exit(0);
});

// Start server after DB init
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} (${NODE_ENV} mode)`);
      if (s3Client && DO_SPACES_BUCKET) {
        console.log(`✓ DigitalOcean Spaces configured (bucket: ${DO_SPACES_BUCKET})`);
      } else {
        console.warn('⚠ DigitalOcean Spaces NOT configured - logo uploads will fail');
      }
    });
  })
  .catch((err) => {
    console.error('Fatal startup error:', err);
    process.exit(1);
  });
