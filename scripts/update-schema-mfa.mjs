import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_0Cuofl6VKkhw@ep-still-salad-b5fenabt-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(connectionString);

async function updateSchema() {
  console.log("Connecting to Neon PostgreSQL to update users schema with password and MFA fields...");

  await sql`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255) DEFAULT 'Nature@2026',
    ADD COLUMN IF NOT EXISTS mfa_enabled BOOLEAN DEFAULT true,
    ADD COLUMN IF NOT EXISTS mfa_secret VARCHAR(64) DEFAULT 'NW-MFA-256';
  `;

  console.log("✓ Added password_hash and MFA columns to 'users'.");

  // Update staff passwords
  await sql`
    UPDATE users 
    SET password_hash = 'admin2026'
    WHERE role IN ('admin', 'dispatcher', 'compliance');
  `;

  // Update client passwords
  await sql`
    UPDATE users 
    SET password_hash = 'client2026'
    WHERE role = 'client';
  `;

  const rows = await sql`
    SELECT id, name, email, role, account_status, password_hash, mfa_enabled 
    FROM users 
    ORDER BY created_at DESC;
  `;

  console.log(`✓ Verified ${rows.length} users with password and MFA in Neon.`);
  console.table(rows);
}

updateSchema().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
