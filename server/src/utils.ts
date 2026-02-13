/**
 * Simple nanoid-like random string generator.
 * No external dependency needed.
 */
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function nanoid(size = 6): string {
  let id = ''
  for (let i = 0; i < size; i++) {
    id += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return id
}
