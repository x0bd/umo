import { Context, Next } from 'hono'

/**
 * Auth middleware — validates Neon Auth JWT.
 *
 * Expects: Authorization: Bearer <token>
 * Sets:    c.set('userId', string)
 *
 * In production, this validates the JWT signature against
 * Neon Auth's JWKS endpoint. For now, we decode the payload
 * to extract the user ID.
 */
export async function authMiddleware(c: Context, next: Next) {
  const header = c.req.header('Authorization')

  if (!header || !header.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = header.slice(7)

  try {
    // Decode JWT payload (base64url)
    const parts = token.split('.')
    if (parts.length !== 3) {
      return c.json({ error: 'Invalid token' }, 401)
    }

    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64url').toString('utf-8')
    )

    if (!payload.sub) {
      return c.json({ error: 'Invalid token payload' }, 401)
    }

    // Check expiry
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return c.json({ error: 'Token expired' }, 401)
    }

    // TODO: In production, verify signature against Neon Auth JWKS
    // const jwks = await fetch(`${NEON_AUTH_BASE_URL}/.well-known/jwks.json`)

    c.set('userId', payload.sub as string)
    await next()
  } catch (err) {
    return c.json({ error: 'Invalid token' }, 401)
  }
}
