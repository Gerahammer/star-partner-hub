/**
 * Migration script: copy partnerstar resources from DO Account A → Account B.
 *
 * Reads tokens from .env.migrate (NEVER prints them).
 *
 * Phases:
 *   1. validate    — check both tokens, list existing resources on Account A
 *   2. provision   — create Postgres + Spaces + access keys on Account B
 *   3. db          — pg_dump from old → restore into new
 *   4. spaces      — copy all bucket files old → new
 *   5. summary     — print env vars to paste into the new App Platform app
 *
 * Run:  npx tsx scripts/migrate.ts <phase>
 *       npx tsx scripts/migrate.ts all   (runs every phase end-to-end)
 */
import { readFileSync, existsSync, writeFileSync } from "fs";
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, CreateBucketCommand } from "@aws-sdk/client-s3";
import { Client } from "pg";

// ---------- Env loading ----------
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

const env = loadEnv(".env.migrate");
const required = ["DO_TOKEN_A", "DO_TOKEN_B", "NEW_BUCKET_NAME", "REGION"] as const;
for (const k of required) {
  if (!env[k]) {
    console.error(`Missing ${k} in .env.migrate`);
    process.exit(1);
  }
}

const TOKEN_A = env.DO_TOKEN_A;
const TOKEN_B = env.DO_TOKEN_B;
const NEW_BUCKET = env.NEW_BUCKET_NAME;
const REGION = env.REGION;

// ---------- DO API helper ----------
async function doApi(token: string, endpoint: string, method = "GET", body?: unknown): Promise<any> {
  const res = await fetch(`https://api.digitalocean.com${endpoint}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`API ${method} ${endpoint}: ${res.status} ${text}`);
  return text ? JSON.parse(text) : {};
}

const log = (msg: string) => console.log(`  ${msg}`);
const phase = (n: number, name: string) => console.log(`\n━━━ Phase ${n}: ${name} ━━━`);
const done = (msg: string) => console.log(`  ✓ ${msg}`);

// ---------- State persistence (so phases can be re-run) ----------
const STATE_FILE = ".migrate-state.json";
function loadState(): Record<string, any> {
  return existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, "utf8")) : {};
}
function saveState(state: Record<string, any>) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ---------- Phase 1: Validate ----------
async function validateAndDiscover() {
  phase(1, "Validate accounts & discover existing resources on A");

  const accA = await doApi(TOKEN_A, "/v2/account");
  const accB = await doApi(TOKEN_B, "/v2/account");
  log(`Account A: ${accA.account.email}`);
  log(`Account B: ${accB.account.email}`);

  // Find the partnerstar app and the DB host it points to
  const apps = await doApi(TOKEN_A, "/v2/apps");
  const partnerstarApp = (apps.apps || []).find((a: any) => a.spec?.name === "partnerstar-app");
  if (!partnerstarApp) throw new Error("Could not find partnerstar-app on Account A");

  const fullApp = await doApi(TOKEN_A, `/v2/apps/${partnerstarApp.id}`);
  const allEnvs = [
    ...(fullApp.app.spec.envs || []),
    ...(fullApp.app.spec.services || []).flatMap((s: any) => s.envs || []),
  ];
  const dbUrlEnv = allEnvs.find((e: any) => e.key === "DATABASE_URL");
  if (!dbUrlEnv?.value) throw new Error("partnerstar-app has no DATABASE_URL");

  // Extract host from DATABASE_URL without printing the URL
  const dbHost = new URL(dbUrlEnv.value).hostname;
  log(`Found app: partnerstar-app → DB host: ${dbHost.split(".")[0]}…`);

  const dbs = await doApi(TOKEN_A, "/v2/databases");
  const partnerstarDb = (dbs.databases || []).find((d: any) =>
    d.connection?.host === dbHost
  );
  if (!partnerstarDb) throw new Error(`Could not find DB matching host ${dbHost}`);
  log(`Matched DB: ${partnerstarDb.name} (${partnerstarDb.region})`);

  const state = loadState();
  state.oldDbId = partnerstarDb.id;
  // Save only host/port/db/user (not full URI w/ password, not full app spec w/ env values)
  state.oldDbConnection = {
    host: partnerstarDb.connection.host,
    port: partnerstarDb.connection.port,
    database: partnerstarDb.connection.database,
    user: partnerstarDb.connection.user,
    ssl: partnerstarDb.connection.ssl,
  };
  state.oldAppId = partnerstarApp?.id;
  saveState(state);

  done("Validation complete");
  console.log("\n  Old DB hostname:", partnerstarDb.connection.host);
  console.log("  Will provision NEW resources on:", accB.account.email);
}

// ---------- Phase 2: Provision ----------
async function provision() {
  phase(2, "Provision Postgres + Spaces on Account B");
  const state = loadState();

  // 2a — Create Postgres
  if (!state.newDbId) {
    log("Creating new Postgres cluster on Account B…");
    const create = await doApi(TOKEN_B, "/v2/databases", "POST", {
      name: `partnerstar-db-copy`,
      engine: "pg",
      version: "16",
      region: REGION,
      size: "db-s-1vcpu-1gb",
      num_nodes: 1,
    });
    state.newDbId = create.database.id;
    saveState(state);
    log(`Created cluster ${state.newDbId} — waiting for online status (5–10 min)…`);
  } else {
    log(`Resuming with existing new DB: ${state.newDbId}`);
  }

  // Poll until online
  while (true) {
    const status = await doApi(TOKEN_B, `/v2/databases/${state.newDbId}`);
    const s = status.database.status;
    if (s === "online") {
      // Don't persist the full connection (contains password); store only host
      state.newDbHost = status.database.connection.host;
      saveState(state);
      done(`DB online (${status.database.connection.host})`);
      break;
    }
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, 10000));
  }

  // 2b — Create Spaces access keys on Account B
  if (!state.newSpacesKey) {
    log("Generating new Spaces access keys on Account B…");
    const keyRes = await doApi(TOKEN_B, "/v2/spaces/keys", "POST", {
      name: "partnerstar-app-copy",
      grants: [{ permission: "fullaccess", bucket: "" }],
    });
    state.newSpacesKey = keyRes.key.access_key;
    state.newSpacesSecret = keyRes.key.secret_key;
    saveState(state);
    done("Spaces keys created");
  } else {
    log("Spaces keys already exist in state");
  }

  // 2c — Create the bucket via S3 API
  const s3New = new S3Client({
    endpoint: `https://${REGION}.digitaloceanspaces.com`,
    region: REGION,
    credentials: { accessKeyId: state.newSpacesKey, secretAccessKey: state.newSpacesSecret },
  });

  if (!state.newBucketCreated) {
    log(`Creating bucket "${NEW_BUCKET}" in ${REGION}…`);
    try {
      await s3New.send(new CreateBucketCommand({ Bucket: NEW_BUCKET }));
      state.newBucketCreated = true;
      saveState(state);
      done(`Bucket ${NEW_BUCKET} created`);
    } catch (e: any) {
      if (e.name === "BucketAlreadyOwnedByYou" || e.Code === "BucketAlreadyOwnedByYou") {
        log("Bucket already exists (owned by you) — continuing");
        state.newBucketCreated = true;
        saveState(state);
      } else {
        throw e;
      }
    }
  }
}

// ---------- Phase 3: DB migration ----------
async function migrateDb() {
  phase(3, "Migrate Postgres data");
  const state = loadState();
  if (!state.oldDbId || !state.newDbId) {
    throw new Error("Run validate + provision first");
  }

  // Old DB credentials: fetched from the partnerstar-app's DATABASE_URL env var
  if (!state.oldAppId) throw new Error("Run validate first");
  const fullApp = await doApi(TOKEN_A, `/v2/apps/${state.oldAppId}`);
  const allEnvs = [
    ...(fullApp.app.spec.envs || []),
    ...(fullApp.app.spec.services || []).flatMap((s: any) => s.envs || []),
  ];
  const dbUrlEnv = allEnvs.find((e: any) => e.key === "DATABASE_URL");
  if (!dbUrlEnv?.value) throw new Error("partnerstar-app has no DATABASE_URL");
  const oldUrl = new URL(dbUrlEnv.value);
  oldUrl.searchParams.delete("sslmode");
  const oldClient = new Client({
    host: oldUrl.hostname,
    port: parseInt(oldUrl.port || "25060"),
    database: oldUrl.pathname.replace(/^\//, "") || "defaultdb",
    user: decodeURIComponent(oldUrl.username),
    password: decodeURIComponent(oldUrl.password),
    ssl: { rejectUnauthorized: false },
  });

  // Use NEW_DB_URL from .env.migrate since the API doesn't return password for new account
  if (!env.NEW_DB_URL) throw new Error("NEW_DB_URL must be set in .env.migrate (copy from DO console)");
  const newUrl = new URL(env.NEW_DB_URL);
  newUrl.searchParams.delete("sslmode");
  const newClient = new Client({
    host: newUrl.hostname,
    port: parseInt(newUrl.port || "25060"),
    database: newUrl.pathname.replace(/^\//, "") || "defaultdb",
    user: decodeURIComponent(newUrl.username),
    password: decodeURIComponent(newUrl.password),
    ssl: { rejectUnauthorized: false },
  });

  await oldClient.connect();
  await newClient.connect();
  log("Connected to both databases");

  try {
    // Recreate the schema
    await newClient.query(`
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
    log("Schema ready on new DB");

    const { rows } = await oldClient.query(
      "SELECT id, site_name, content, site_url, logo_url, created_at, updated_at FROM testimonials"
    );
    log(`Found ${rows.length} testimonials in old DB`);

    if (rows.length > 0) {
      // Wipe new table and re-insert (idempotent)
      await newClient.query("TRUNCATE testimonials");
      for (const r of rows) {
        await newClient.query(
          `INSERT INTO testimonials (id, site_name, content, site_url, logo_url, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [r.id, r.site_name, r.content, r.site_url, r.logo_url, r.created_at, r.updated_at]
        );
      }
    }
    done(`Copied ${rows.length} rows`);
  } finally {
    await oldClient.end();
    await newClient.end();
  }
}

function stripSslMode(uri: string): string {
  try {
    const u = new URL(uri);
    u.searchParams.delete("sslmode");
    return u.toString();
  } catch {
    return uri;
  }
}

// ---------- Phase 4: Spaces migration ----------
async function migrateSpaces() {
  phase(4, "Migrate Spaces files");
  const state = loadState();

  if (!env.OLD_SPACES_KEY || !env.OLD_SPACES_SECRET || !env.OLD_SPACES_BUCKET) {
    console.error(
      "\n  ⚠ Need OLD_SPACES_KEY, OLD_SPACES_SECRET, OLD_SPACES_BUCKET in .env.migrate to copy files.\n" +
      "  Get the existing key/secret from your old DigitalOcean app's env vars.\n" +
      "  Set OLD_SPACES_BUCKET=partnerstar-logos\n"
    );
    process.exit(1);
  }

  const oldS3 = new S3Client({
    endpoint: `https://${REGION}.digitaloceanspaces.com`,
    region: REGION,
    credentials: { accessKeyId: env.OLD_SPACES_KEY, secretAccessKey: env.OLD_SPACES_SECRET },
  });
  const newS3 = new S3Client({
    endpoint: `https://${REGION}.digitaloceanspaces.com`,
    region: REGION,
    credentials: { accessKeyId: state.newSpacesKey, secretAccessKey: state.newSpacesSecret },
  });

  let count = 0;
  let token: string | undefined;
  do {
    const list = await oldS3.send(new ListObjectsV2Command({ Bucket: env.OLD_SPACES_BUCKET, ContinuationToken: token }));
    for (const obj of list.Contents || []) {
      const get = await oldS3.send(new GetObjectCommand({ Bucket: env.OLD_SPACES_BUCKET, Key: obj.Key! }));
      const body = await get.Body!.transformToByteArray();
      await newS3.send(
        new PutObjectCommand({
          Bucket: NEW_BUCKET,
          Key: obj.Key!,
          Body: body,
          ContentType: get.ContentType,
          ACL: "public-read",
          CacheControl: "public, max-age=31536000",
        })
      );
      count++;
      process.stdout.write(`\r  Copied ${count} files…`);
    }
    token = list.NextContinuationToken;
  } while (token);

  console.log("");
  done(`Copied ${count} files to ${NEW_BUCKET}`);
}

// ---------- Phase 5: Summary ----------
async function summary() {
  phase(5, "Summary");
  const state = loadState();

  // Use NEW_DB_URL from .env.migrate (the API doesn't return passwords)
  const newDbUrl = env.NEW_DB_URL ?? "(missing — set NEW_DB_URL in .env.migrate)";

  // Pull existing secrets from Account A's app so the new app starts identical
  let adminPassword = "";
  let telegramBotToken = "";
  let telegramChatId = "";
  if (state.oldAppId) {
    const fullApp = await doApi(TOKEN_A, `/v2/apps/${state.oldAppId}`);
    const allEnvs = [
      ...(fullApp.app.spec.envs || []),
      ...(fullApp.app.spec.services || []).flatMap((s: any) => s.envs || []),
    ];
    const get = (key: string) => allEnvs.find((e: any) => e.key === key)?.value || "";
    adminPassword = get("ADMIN_PASSWORD");
    telegramBotToken = get("TELEGRAM_BOT_TOKEN");
    telegramChatId = get("TELEGRAM_CHAT_ID");
  }

  // Write env vars to a separate file (gitignored)
  const envContent = `DATABASE_URL=${newDbUrl}
DO_SPACES_KEY=${state.newSpacesKey ?? ""}
DO_SPACES_SECRET=${state.newSpacesSecret ?? ""}
DO_SPACES_BUCKET=${NEW_BUCKET}
DO_SPACES_REGION=${REGION}
DO_SPACES_ENDPOINT=https://${REGION}.digitaloceanspaces.com
DO_SPACES_CDN=https://${NEW_BUCKET}.${REGION}.cdn.digitaloceanspaces.com
ADMIN_PASSWORD=${adminPassword}
TELEGRAM_BOT_TOKEN=${telegramBotToken}
TELEGRAM_CHAT_ID=${telegramChatId}
ALLOWED_ORIGINS=
NODE_ENV=production
PORT=8080
`;
  writeFileSync(".env.new-app", envContent);
  console.log("\n  ✓ New env vars written to .env.new-app (gitignored)");
  console.log("  Open it: cat .env.new-app  (or open in your editor)\n");
  console.log("  NEXT MANUAL STEP — create the new App Platform app on Account B:");
  console.log("    1. https://cloud.digitalocean.com/apps (logged into Account B)");
  console.log("    2. Create App → Source: GitHub → Authorize GitHub if first time");
  console.log("    3. Pick repo: Gerahammer/star-partner-hub  branch: main");
  console.log("    4. Resource type: Web Service (NOT Static Site)");
  console.log("    5. Set the env vars from .env.new-app");
  console.log("    6. Deploy\n");
  console.log("  ⚠ Enable CDN on the new bucket via Spaces UI before users hit it.\n");
  return; // skip the old printout below
  console.log(`
  (the rest is unreachable)
  DATABASE_URL              = (in .env.new-app)
  DO_SPACES_KEY             = (in .env.new-app)
  DO_SPACES_SECRET          = (in .env.new-app)
  DO_SPACES_BUCKET          = ${NEW_BUCKET}
  DO_SPACES_REGION          = ${REGION}
  DO_SPACES_ENDPOINT        = https://${REGION}.digitaloceanspaces.com
  DO_SPACES_CDN             = https://${NEW_BUCKET}.${REGION}.cdn.digitaloceanspaces.com   (only if you enable CDN)
  ADMIN_PASSWORD            = (set your own; not migrated)
  TELEGRAM_BOT_TOKEN        = (same as old or new bot)
  TELEGRAM_CHAT_ID          = (same as old or new chat)
  ALLOWED_ORIGINS           = (your new domain or leave empty)
  NODE_ENV                  = production
  PORT                      = 8080

  NEXT MANUAL STEP — create the new App Platform app on Account B:
    1. https://cloud.digitalocean.com/apps (logged into Account B)
    2. Create App → Source: GitHub → Authorize GitHub if first time
    3. Pick repo: Gerahammer/star-partner-hub  branch: main
    4. Resource type: Web Service (NOT Static Site)
    5. Set the env vars above
    6. Deploy

  ⚠ Enable CDN on the new bucket via Spaces UI before users hit it.
`);
}

// ---------- Main ----------
const phaseArg = process.argv[2] ?? "all";
async function main() {
  switch (phaseArg) {
    case "validate":
      await validateAndDiscover();
      break;
    case "provision":
      await provision();
      break;
    case "db":
      await migrateDb();
      break;
    case "spaces":
      await migrateSpaces();
      break;
    case "summary":
      await summary();
      break;
    case "all":
      await validateAndDiscover();
      await provision();
      await migrateDb();
      await migrateSpaces();
      await summary();
      break;
    default:
      console.error(`Unknown phase: ${phaseArg}`);
      console.error(`Usage: npx tsx scripts/migrate.ts [validate|provision|db|spaces|summary|all]`);
      process.exit(1);
  }
}
main().catch((e) => {
  console.error("\n  ✗ Failed:", e.message ?? e);
  process.exit(1);
});
