import { and, eq, or } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../db'
import { friends } from '../db/schema'

const app = new Hono()

// ============================================
// LIST FRIENDS
// ============================================
app.get('/', async (c) => {
  const userId = c.get('userId') as string

  const friendsList = await db.query.friends.findMany({
    where: or(
      eq(friends.userId, userId),
      eq(friends.friendId, userId)
    ),
  })

  return c.json({ friends: friendsList })
})

// ============================================
// ADD FRIEND
// ============================================
app.post('/add', async (c) => {
  const userId = c.get('userId') as string
  const { friendId } = await c.req.json()

  if (userId === friendId) {
    return c.json({ error: 'Cannot add yourself' }, 400)
  }

  // Check if already friends
  const existing = await db.query.friends.findFirst({
    where: or(
      and(eq(friends.userId, userId), eq(friends.friendId, friendId)),
      and(eq(friends.userId, friendId), eq(friends.friendId, userId))
    ),
  })

  if (existing) {
    return c.json({ error: 'Already friends' }, 409)
  }

  const [friend] = await db
    .insert(friends)
    .values({
      userId,
      friendId,
    })
    .returning()

  return c.json({ friend }, 201)
})

// ============================================
// REMOVE FRIEND
// ============================================
app.delete('/:id', async (c) => {
  const friendshipId = c.req.param('id')

  await db.delete(friends).where(eq(friends.id, friendshipId))

  return c.json({ success: true })
})

export default app
