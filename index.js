/**
 * Custom app entry — polyfills globalThis.crypto BEFORE expo-router
 * or any other module loads.
 *
 * CRITICAL: We use require() instead of import because ES import
 * statements are HOISTED by Metro — all imports evaluate before any
 * inline code runs. require() is synchronous and not hoisted, so
 * the polyfill runs in the exact order written here.
 */

// 1. Set up the crypto polyfill using expo-crypto (synchronous require)
const ExpoCrypto = require('expo-crypto')

if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = {}
}
if (!globalThis.crypto.getRandomValues) {
  globalThis.crypto.getRandomValues = ExpoCrypto.getRandomValues
}
if (!globalThis.crypto.randomUUID) {
  globalThis.crypto.randomUUID = ExpoCrypto.randomUUID
}

// 2. NOW boot the app — crypto is available for @neondatabase/neon-js
require('expo-router/entry')
