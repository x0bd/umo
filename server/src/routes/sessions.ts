import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../db'
import {
    itemClaims,
    items,
    sessionMembers,
    sessions,
    settlements,
} from '../db/schema'
import { nanoid } from '../utils'

const app = new Hono()

// ============================================
// CREATE SESSION
// ============================================
app.post('/', async (c) => {
  const userId = c.get('userId') as string
  const body = await c.req.json()

  const inviteCode = nanoid(4)

  const [session] = await db
    .insert(sessions)
    .values({
      name: body.name,
      venue: body.venue || null,
      currency: body.currency || 'USD',
      inviteCode,
      hostId: userId,
    })
    .returning()

  // Add host as a member
  await db.insert(sessionMembers).values({
    sessionId: session.id,
    userId,
    role: 'host',
  })

  return c.json({ session }, 201)
})

// ============================================
// LIST USER'S SESSIONS
// ============================================
app.get('/', async (c) => {
  const userId = c.get('userId') as string

  const memberships = await db.query.sessionMembers.findMany({
    where: eq(sessionMembers.userId, userId),
    with: {
      session: true,
    },
    orderBy: (m, { desc }) => [desc(m.joinedAt)],
  })

  const result = memberships.map((m) => ({
    ...m.session,
    role: m.role,
  }))

  return c.json({ sessions: result })
})

// ============================================
// GET SESSION DETAIL
// ============================================
app.get('/:id', async (c) => {
  const sessionId = c.req.param('id')

  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
    with: {
      members: {
        with: {
          user: true,
        },
      },
      items: {
        with: {
          claims: true,
        },
      },
      settlements: true,
    },
  })

  if (!session) {
    return c.json({ error: 'Session not found' }, 404)
  }

  return c.json({ session })
})

// ============================================
// JOIN SESSION BY INVITE CODE
// ============================================
app.post('/join', async (c) => {
  const userId = c.get('userId') as string
  const { code } = await c.req.json()

  const session = await db.query.sessions.findFirst({
    where: eq(sessions.inviteCode, code.toUpperCase()),
  })

  if (!session) {
    return c.json({ error: 'Invalid invite code' }, 404)
  }

  if (session.status !== 'active') {
    return c.json({ error: 'Session is no longer active' }, 400)
  }

  // Check if already a member
  const existing = await db.query.sessionMembers.findFirst({
    where: and(
      eq(sessionMembers.sessionId, session.id),
      eq(sessionMembers.userId, userId)
    ),
  })

  if (existing) {
    return c.json({ error: 'Already a member', session }, 409)
  }

  await db.insert(sessionMembers).values({
    sessionId: session.id,
    userId,
    role: 'member',
  })

  return c.json({ session })
})

// ============================================
// ADD ITEMS TO SESSION
// ============================================
app.post('/:id/items', async (c) => {
  const userId = c.get('userId') as string
  const sessionId = c.req.param('id')
  const body = await c.req.json()

  // body.items = [{ name, price, quantity?, category? }]
  const newItems = await db
    .insert(items)
    .values(
      body.items.map((item: any) => ({
        sessionId,
        name: item.name,
        price: String(item.price),
        quantity: item.quantity || 1,
        category: item.category || null,
        addedBy: userId,
      }))
    )
    .returning()

  return c.json({ items: newItems }, 201)
})

// ============================================
// CLAIM ITEMS
// ============================================
app.post('/:id/claim', async (c) => {
  const userId = c.get('userId') as string
  const body = await c.req.json()

  // body.claims = [{ itemId, share? }]
  const newClaims = await db
    .insert(itemClaims)
    .values(
      body.claims.map((claim: any) => ({
        itemId: claim.itemId,
        userId,
        share: String(claim.share || 1),
      }))
    )
    .returning()

  return c.json({ claims: newClaims }, 201)
})

// ============================================
// RECORD SETTLEMENT
// ============================================
app.post('/:id/settle', async (c) => {
  const userId = c.get('userId') as string
  const sessionId = c.req.param('id')
  const body = await c.req.json()

  const [settlement] = await db
    .insert(settlements)
    .values({
      sessionId,
      payerId: userId,
      payeeId: body.payeeId,
      amount: String(body.amount),
      currency: body.currency || 'USD',
      method: body.method || null,
    })
    .returning()

  return c.json({ settlement }, 201)
})

export default app
