import { serve } from '@hono/node-server'
import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { authMiddleware } from './middleware/auth'
import exchangeRoutes from './routes/exchange'
import friendsRoutes from './routes/friends'
import sessionsRoutes from './routes/sessions'

// ============================================
// HONO APP
// ============================================
const app = new Hono()

// Global middleware
app.use('*', logger())
app.use(
  '*',
  cors({
    origin: '*', // Tighten in production
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
)

// Health check (no auth)
app.get('/', (c) => {
  return c.json({
    name: 'umo-api',
    version: '1.0.0',
    status: 'ok',
  })
})

// Public routes (no auth)
app.route('/exchange', exchangeRoutes)

// Protected routes (auth required)
app.use('/api/*', authMiddleware)
app.route('/api/sessions', sessionsRoutes)
app.route('/api/friends', friendsRoutes)

// ============================================
// START SERVER
// ============================================
const port = parseInt(process.env.PORT || '3000', 10)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`
  ┌─────────────────────────────┐
  │     umo api · v1.0.0        │
  │     http://localhost:${info.port}     │
  └─────────────────────────────┘
  `)
})
