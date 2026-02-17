/**
 * Neon JS client — auth + data API.
 *
 * Set EXPO_PUBLIC_NEON_AUTH_URL and EXPO_PUBLIC_NEON_DATA_API_URL
 * in your .env file after creating a Neon project with Auth enabled.
 *
 * The crypto polyfill is set up in index.js (app entry point)
 * which runs before any route module loads.
 */
import { createClient } from '@neondatabase/neon-js'

export const neonClient = createClient({
  auth: {
    url: process.env.EXPO_PUBLIC_NEON_AUTH_URL!,
  },
  dataApi: {
    url: process.env.EXPO_PUBLIC_NEON_DATA_API_URL!,
  },
})

// Re-export for convenience
export const auth = neonClient.auth
export const data = neonClient
