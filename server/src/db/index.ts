import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Add it to your .env file before using any database routes.',
    );
  }
  return drizzle(neon(url), { schema });
}

// Lazy singleton — the DB connection is only established on first use,
// which means the server can boot (and serve /exchange) without DATABASE_URL.
let _db: ReturnType<typeof createDb> | null = null;

export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop) {
    if (!_db) _db = createDb();
    return (_db as Record<string | symbol, unknown>)[prop];
  },
});

export type DB = ReturnType<typeof createDb>;
