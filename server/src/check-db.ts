import { neon } from '@neondatabase/serverless'
import 'dotenv/config'

async function run() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.error('No DATABASE_URL found')
    return
  }

  const sql = neon(connectionString)

  try {
    console.log('Dropping legacy app tables (if they exist)...')
    await sql`DROP TABLE IF EXISTS settlements CASCADE;`
    await sql`DROP TABLE IF EXISTS item_claims CASCADE;`
    await sql`DROP TABLE IF EXISTS items CASCADE;`
    await sql`DROP TABLE IF EXISTS session_members CASCADE;`
    await sql`DROP TABLE IF EXISTS sessions CASCADE;`
    await sql`DROP TABLE IF EXISTS friends CASCADE;`
    await sql`DROP TABLE IF EXISTS profiles CASCADE;`
    console.log('Done dropping legacy tables.')
  } catch (e) {
    console.error('Error while dropping tables:', e)
  }
}

run()
