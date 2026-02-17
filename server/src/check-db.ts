import { neon } from '@neondatabase/serverless'
import 'dotenv/config'

async function check() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.error('No DATABASE_URL found')
    return
  }
  
  const sql = neon(connectionString)
  
  try {
    console.log('Checking public tables...')
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    const names = tables.map((t: any) => t.table_name)
    console.log('Public tables:', names)

    if (names.length > 0) {
      console.log('SUCCESS: Tables found.')
    } else {
      console.log('FAILURE: No tables found in public schema.')
    }

  } catch (e) {
    console.error('Error:', e)
  }
}

check()
