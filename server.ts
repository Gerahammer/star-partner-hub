import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import fs from 'fs';
import { randomUUID } from 'crypto';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Database setup
const dbPath = path.join(process.cwd(), 'testimonials.db');
const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    site_name TEXT NOT NULL,
    content TEXT NOT NULL,
    site_url TEXT,
    logo_url TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

interface Testimonial {
  id: string;
  site_name: string;
  content: string;
  site_url: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
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

  // Clean up or initialize IP entry
  if (!rateLimitStore.has(ipAddress)) {
    rateLimitStore.set(ipAddress, []);
  }

  let timestamps = rateLimitStore.get(ipAddress)!;

  // Remove old timestamps outside the window
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
  return password === ADMIN_PASSWORD && ADMIN_PASSWORD;
}

function ensurePublicLogosDir(): void {
  const logosDir = path.join(process.cwd(), 'public', 'logos');
  if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
  }
}

// Configure multer for logo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensurePublicLogosDir();
    cb(null, path.join(process.cwd(), 'public', 'logos'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${randomUUID()}${ext}`;
    cb(null, fileName);
  }
});

const uploadFilter = (req: any, file: any, cb: any) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Only image files are allowed'));
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter: uploadFilter, limits: { fileSize: 5 * 1024 * 1024 } });


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
      headers: {
        'Content-Type': 'application/json',
      },
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

    const data = await response.json();
    console.log('Telegram message sent successfully:', data);
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

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required',
        message: 'Please fill in all required fields'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email address',
        message: 'Please enter a valid email address'
      });
    }

    // Check rate limit
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return res.status(429).json({
        error: 'Too many requests',
        message: 'Please try again later. Maximum 5 requests per hour.'
      });
    }

    // Sanitize inputs
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : '';
    const safeTelegram = telegram ? escapeHtml(telegram) : '';
    const safeTeams = teams ? escapeHtml(teams) : '';
    const safeMessage = escapeHtml(message);

    console.log(`Processing contact form from ${clientIP}: ${safeName} <${safeEmail}>`);

    // Send Telegram notification
    const telegramSent = await sendTelegramMessage(
      safeName,
      safeEmail,
      safeCompany,
      safeTelegram,
      safeTeams,
      safeMessage
    );

    // Record rate limit (only after successful processing)
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
app.get('/api/testimonials', (req: Request, res: Response) => {
  try {
    const stmt = db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC');
    const testimonials = stmt.all() as Testimonial[];
    res.json(testimonials);
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

app.post('/api/testimonials', (req: Request, res: Response) => {
  try {
    if (!checkAdminPassword(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { site_name, content, site_url, logo_url } = req.body;

    if (!site_name || !content) {
      return res.status(400).json({ error: 'site_name and content are required' });
    }

    const id = randomUUID();
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO testimonials (id, site_name, content, site_url, logo_url, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id, site_name, content, site_url || null, logo_url || null, now, now);

    res.status(201).json({ id, site_name, content, site_url, logo_url, created_at: now, updated_at: now });
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

app.put('/api/testimonials/:id', (req: Request, res: Response) => {
  try {
    if (!checkAdminPassword(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const { site_name, content, site_url, logo_url } = req.body;

    if (!site_name || !content) {
      return res.status(400).json({ error: 'site_name and content are required' });
    }

    const now = new Date().toISOString();

    const stmt = db.prepare(`
      UPDATE testimonials SET site_name = ?, content = ?, site_url = ?, logo_url = ?, updated_at = ?
      WHERE id = ?
    `);

    const result = stmt.run(site_name, content, site_url || null, logo_url || null, now, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ id, site_name, content, site_url, logo_url, updated_at: now });
  } catch (error: any) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

app.delete('/api/testimonials/:id', (req: Request, res: Response) => {
  try {
    if (!checkAdminPassword(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    const stmt = db.prepare('DELETE FROM testimonials WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// File upload endpoint
app.post('/api/testimonials/upload', upload.single('file'), (req: Request, res: Response) => {
  try {
    if (!checkAdminPassword(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const relativePath = `/logos/${req.file.filename}`;
    res.json({ url: relativePath });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: error.message || 'Failed to upload file' });
  }
});

// Serve static logos
app.use('/logos', express.static(path.join(process.cwd(), 'public', 'logos')));

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (${NODE_ENV} mode)`);
  if (NODE_ENV === 'development') {
    console.log(`   API: http://localhost:${PORT}/api/contact`);
    console.log(`   Health: http://localhost:${PORT}/health`);
  }
});
