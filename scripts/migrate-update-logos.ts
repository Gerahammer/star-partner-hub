/**
 * After spaces migration, rewrite logo_url in the NEW DB to point to the new bucket.
 * Run AFTER `db` and `spaces` phases.
 */
import { readFileSync, existsSync } from "fs";
import { Client } from "pg";

function loadEnv(path: string): Record<string, string> {
  if (!existsSync(path)) {
    console.error(`Missing ${path}`);
    process.exit(1);
  }
  const out: Record<string, string> = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    out[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  }
  return out;
}

async function main() {
  const env = loadEnv(".env.migrate");
  if (!env.NEW_DB_URL || !env.OLD_SPACES_BUCKET || !env.NEW_BUCKET_NAME) {
    console.error("Need NEW_DB_URL, OLD_SPACES_BUCKET, NEW_BUCKET_NAME in .env.migrate");
    process.exit(1);
  }

  const url = new URL(env.NEW_DB_URL);
  url.searchParams.delete("sslmode");
  const client = new Client({
    host: url.hostname,
    port: parseInt(url.port || "25060"),
    database: url.pathname.replace(/^\//, "") || "defaultdb",
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    const oldBucket = env.OLD_SPACES_BUCKET;
    const newBucket = env.NEW_BUCKET_NAME;

    // Replace any occurrence of old-bucket. with new-bucket.
    // Patterns: https://old.region.digitaloceanspaces.com/key
    //           https://old.region.cdn.digitaloceanspaces.com/key
    //           https://region.digitaloceanspaces.com/old/key
    const result = await client.query(
      `UPDATE testimonials
       SET logo_url = REPLACE(REPLACE(logo_url, $1, $2), $3, $4)
       WHERE logo_url IS NOT NULL`,
      [
        `${oldBucket}.fra1.cdn.digitaloceanspaces.com`,
        `${newBucket}.fra1.cdn.digitaloceanspaces.com`,
        `${oldBucket}.fra1.digitaloceanspaces.com`,
        `${newBucket}.fra1.digitaloceanspaces.com`,
      ]
    );
    console.log(`✓ Rewrote ${result.rowCount} logo_url(s) to point to ${newBucket}`);

    // Also rewrite the path-style URL: fra1.digitaloceanspaces.com/old-bucket → /new-bucket
    const result2 = await client.query(
      `UPDATE testimonials
       SET logo_url = REPLACE(logo_url, $1, $2)
       WHERE logo_url LIKE $3`,
      [
        `digitaloceanspaces.com/${oldBucket}/`,
        `digitaloceanspaces.com/${newBucket}/`,
        `%digitaloceanspaces.com/${oldBucket}/%`,
      ]
    );
    console.log(`✓ Rewrote ${result2.rowCount} path-style logo_url(s)`);
  } finally {
    await client.end();
  }
}
main().catch((e) => {
  console.error("Failed:", e.message ?? e);
  process.exit(1);
});
