/**
 * Neon JS client — auth + data API.
 *
 * Set EXPO_PUBLIC_NEON_AUTH_URL and EXPO_PUBLIC_NEON_DATA_API_URL
 * in your .env file after creating a Neon project with Auth enabled.
 *
 * We import `expo-standard-web-crypto` once here to polyfill `global.crypto`
 * in React Native so Neon Auth can use Web Crypto APIs safely.
 */
import { createClient } from '@neondatabase/neon-js'
import 'expo-standard-web-crypto'

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
