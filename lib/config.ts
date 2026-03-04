/**
 * API base URL.
 *
 * In dev, the Hono server runs on localhost:3001.
 * Set EXPO_PUBLIC_API_URL in your .env to point to a deployed server.
 *
 * When running on a physical device via Expo Go, replace "localhost"
 * with your machine's local IP address, e.g. http://192.168.1.x:3001
 */
export const API_URL =
  (process.env.EXPO_PUBLIC_API_URL as string | undefined) ?? 'http://192.168.1.245:3000';
