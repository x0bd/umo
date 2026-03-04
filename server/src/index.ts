import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

import { authMiddleware } from './middleware/auth.js';
import { exchangeRouter } from './routes/exchange.js';
import { sessionsRouter } from './routes/sessions.js';
import { friendsRouter } from './routes/friends.js';

// ─── App ──────────────────────────────────────────────────────────────────────

const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use(
  '*',
  cors({
    origin: process.env.CORS_ORIGIN ?? '*',
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Authorization', 'Content-Type'],
  })
);

// ─── Public routes ────────────────────────────────────────────────────────────

app.get('/', (c) => c.json({ name: 'umo-api', status: 'ok' }));

// Exchange rate — public, no auth required
app.route('/exchange', exchangeRouter);

// ─── Protected routes ─────────────────────────────────────────────────────────

const api = new Hono();
api.use('*', authMiddleware);
api.route('/sessions', sessionsRouter);
api.route('/friends', friendsRouter);

app.route('/api', api);

// ─── 404 handler ─────────────────────────────────────────────────────────────

app.notFound((c) => c.json({ error: 'Not found' }, 404));
app.onError((err, c) => {
  console.error('[error]', err);
  return c.json({ error: 'Internal server error' }, 500);
});

// ─── Start ────────────────────────────────────────────────────────────────────

const port = Number(process.env.PORT ?? 3000);
console.log(`umo-api listening on http://localhost:${port}`);

serve({ fetch: app.fetch, port });

export default app;
