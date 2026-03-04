import { MiddlewareHandler } from 'hono';

/**
 * Validates the Bearer token issued by Neon Auth.
 * Attaches `c.var.userId` for downstream handlers.
 *
 * In production: verify the JWT against Neon Auth's JWKS endpoint.
 * For local dev: set BYPASS_AUTH=true to skip verification.
 */
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  if (process.env.BYPASS_AUTH === 'true') {
    c.set('userId', 'dev-user');
    return next();
  }

  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = authHeader.slice(7);

  // TODO: replace with actual Neon Auth JWT verification
  // const payload = await verifyNeonJwt(token);
  // c.set('userId', payload.sub);

  // Stub: accept any non-empty token for now
  if (!token) {
    return c.json({ error: 'Invalid token' }, 401);
  }

  c.set('userId', token); // swap for real sub claim
  await next();
};

// Extend Hono type for userId variable
declare module 'hono' {
  interface ContextVariableMap {
    userId: string;
  }
}
