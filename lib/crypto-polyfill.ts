/**
 * Polyfill globalThis.crypto for React Native (Hermes).
 *
 * This MUST be imported as a side-effect BEFORE any module that
 * accesses globalThis.crypto (e.g. @neondatabase/neon-js).
 *
 * Uses `expo-crypto` which is part of the Expo SDK and already installed.
 */
import { getRandomValues, randomUUID } from 'expo-crypto'

if (typeof globalThis.crypto === 'undefined') {
  ;(globalThis as any).crypto = {}
}

if (!globalThis.crypto.getRandomValues) {
  ;(globalThis.crypto as any).getRandomValues = getRandomValues
}

if (!globalThis.crypto.randomUUID) {
  ;(globalThis.crypto as any).randomUUID = randomUUID
}
