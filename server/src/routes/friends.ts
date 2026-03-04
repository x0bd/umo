import { Hono } from 'hono';
import { db } from '../db/index.js';
import { friends, profiles } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';

export const friendsRouter = new Hono();

/** GET /friends — list friends of current user */
friendsRouter.get('/', async (c) => {
  const userId = c.get('userId');

  const rows = await db
    .select({ friend: profiles })
    .from(friends)
    .innerJoin(profiles, eq(profiles.userId, friends.friendId))
    .where(eq(friends.userId, userId));

  return c.json(rows.map((r) => r.friend));
});

/** POST /friends/add — add a friend by userId */
friendsRouter.post('/add', async (c) => {
  const userId = c.get('userId');
  const { friendId } = await c.req.json<{ friendId: string }>();

  if (friendId === userId) {
    return c.json({ error: 'Cannot add yourself' }, 400);
  }

  const [row] = await db
    .insert(friends)
    .values({ userId, friendId })
    .onConflictDoNothing()
    .returning();

  return c.json(row ?? { message: 'Already friends' }, 200);
});

/** DELETE /friends/:id — remove a friend */
friendsRouter.delete('/:id', async (c) => {
  const userId = c.get('userId');
  const friendId = c.req.param('id');

  await db.delete(friends).where(and(eq(friends.userId, userId), eq(friends.friendId, friendId)));

  return c.json({ removed: true });
});
