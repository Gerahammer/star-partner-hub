# Testimonials Setup Guide

This project uses **DigitalOcean Managed PostgreSQL** for testimonial data and **DigitalOcean Spaces** for logo storage. This is required because App Platform's filesystem is ephemeral — without persistent storage, testimonials and uploaded logos disappear on every redeploy.

## 1. Create Managed PostgreSQL Database

1. Go to **DigitalOcean Console → Databases → Create → PostgreSQL**
2. Choose:
   - Plan: **Basic** ($15/mo) — smallest works fine
   - Region: **Frankfurt (FRA1)** — same as the app
   - DB version: **15** or newer
3. Once provisioned, open the database → **Connection Details** → copy the **Connection String** (looks like `postgresql://doadmin:...@host:25060/defaultdb?sslmode=require`)
4. In your App Platform app → **Settings → App-Level Environment Variables**, add:
   - Key: `DATABASE_URL`
   - Value: *(the connection string)*
   - Encrypted: ✅
5. (Recommended) Restrict the database's "Trusted Sources" to just this app for security

The schema is created automatically on first server start.

## 2. Create DigitalOcean Spaces Bucket

1. Go to **DigitalOcean Console → Spaces Object Storage → Create**
2. Choose:
   - Region: **Frankfurt (FRA1)**
   - Name: e.g. `partnerstar-logos` (must be globally unique)
   - File Listing: **Restrict** (we set per-object public read instead)
3. After creation, open the bucket → **Settings → CORS Configurations** → add:
   ```
   Origin: *
   Allowed Methods: GET
   Allowed Headers: *
   Access Control Max Age: 3600
   ```
4. (Optional) Enable **CDN** for the bucket — gives you a CDN URL like `https://partnerstar-logos.fra1.cdn.digitaloceanspaces.com`

## 3. Create Spaces Access Keys

1. Go to **API → Spaces Keys → Generate New Key**
2. Save the **Key** and **Secret** (secret is only shown once!)
3. In App Platform → **Settings → Environment Variables**, add:
   - `DO_SPACES_KEY` = *(your key)* — encrypted
   - `DO_SPACES_SECRET` = *(your secret)* — encrypted
   - `DO_SPACES_BUCKET` = `partnerstar-logos` *(or your bucket name)*
   - `DO_SPACES_REGION` = `fra1`
   - `DO_SPACES_ENDPOINT` = `https://fra1.digitaloceanspaces.com`
   - `DO_SPACES_CDN` = `https://partnerstar-logos.fra1.cdn.digitaloceanspaces.com` *(optional, only if you enabled CDN)*

## 4. Required Existing Variables

Make sure these are also set:
- `ADMIN_PASSWORD` — for admin auth
- `TELEGRAM_BOT_TOKEN` — for contact form
- `TELEGRAM_CHAT_ID` — for contact form
- `NODE_ENV` = `production`
- `PORT` = `8080`

## 5. Local Development

Add to your `.env`:
```
DATABASE_URL="postgresql://localhost:5432/partnerstar_dev"
DO_SPACES_KEY="..."
DO_SPACES_SECRET="..."
DO_SPACES_BUCKET="partnerstar-logos"
DO_SPACES_REGION="fra1"
DO_SPACES_ENDPOINT="https://fra1.digitaloceanspaces.com"
ADMIN_PASSWORD="your-local-password"
```

For local Postgres:
```
brew install postgresql@15
brew services start postgresql@15
createdb partnerstar_dev
```

## Verification

After deployment, the app logs should show:
```
✓ Database schema initialized
🚀 Server running on port 8080 (production mode)
✓ DigitalOcean Spaces configured (bucket: partnerstar-logos)
```

If you see `⚠ DigitalOcean Spaces NOT configured`, the env vars are missing.

## Cost Estimate

- Managed PostgreSQL Basic: **$15/mo**
- Spaces: **$5/mo** (250GB storage + 1TB transfer included)
- **Total: ~$20/mo extra**
