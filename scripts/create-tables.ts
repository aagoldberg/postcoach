import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL as string);

async function createTables() {
  console.log('Creating PostCoach tables...');

  await sql`
    CREATE TABLE IF NOT EXISTS postcoach_analysis_cache (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      fid INTEGER NOT NULL,
      username TEXT,
      analysis_json JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      expires_at TIMESTAMP NOT NULL
    )
  `;
  console.log('✓ postcoach_analysis_cache');

  await sql`
    CREATE TABLE IF NOT EXISTS postcoach_rate_limits (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      identifier TEXT NOT NULL,
      endpoint TEXT NOT NULL,
      request_count INTEGER DEFAULT 0 NOT NULL,
      window_start TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log('✓ postcoach_rate_limits');

  await sql`
    CREATE TABLE IF NOT EXISTS postcoach_cast_embeddings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      cast_hash TEXT NOT NULL UNIQUE,
      fid INTEGER NOT NULL,
      embedding JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;
  console.log('✓ postcoach_cast_embeddings');

  console.log('\nAll tables created successfully!');
}

createTables().catch(console.error);
