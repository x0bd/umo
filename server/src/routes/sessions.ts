import { Hono } from 'hono';
import { db } from '../db/index.js';
import { sessions, sessionMembers, items } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const sessionsRouter = new Hono();

/** POST /sessions — create a new split session */
sessionsRouter.post('/', async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json<{ title: string; venue?: string; currency?: string }>();

  const inviteCode = nanoid(8).toUpperCase();

  const [session] = await db
    .insert(sessions)
    .values({
      title: body.title,
      venue: body.venue ?? null,
      hostId: userId,
      inviteCode,
      currency: body.currency ?? 'USD',
    })
    .returning();

  // Auto-add host as member
  await db.insert(sessionMembers).values({
    sessionId: session.id,
    userId,
    role: 'host',
  });

  return c.json(session, 201);
});

/** GET /sessions — list sessions for the current user */
sessionsRouter.get('/', async (c) => {
  const userId = c.get('userId');

  const rows = await db
    .select()
    .from(sessions)
    .innerJoin(sessionMembers, eq(sessions.id, sessionMembers.sessionId))
    .where(eq(sessionMembers.userId, userId))
    .orderBy(sessions.createdAt);

  return c.json(rows.map((r) => r.sessions));
});

/** GET /sessions/:id — session detail with items + members */
sessionsRouter.get('/:id', async (c) => {
  const sessionId = c.req.param('id');

  const [session] = await db.select().from(sessions).where(eq(sessions.id, sessionId)).limit(1);
  if (!session) return c.json({ error: 'Not found' }, 404);

  const members = await db
    .select()
    .from(sessionMembers)
    .where(eq(sessionMembers.sessionId, sessionId));

  const sessionItems = await db.select().from(items).where(eq(items.sessionId, sessionId));

  return c.json({ session, members, items: sessionItems });
});

/** POST /sessions/:id/items — add an item */
sessionsRouter.post('/:id/items', async (c) => {
  const sessionId = c.req.param('id');
  const body = await c.req.json<{
    name: string;
    qty: number;
    unitPrice: number;
    category?: string;
  }>();

  const [item] = await db
    .insert(items)
    .values({
      sessionId,
      name: body.name,
      qty: String(body.qty ?? 1),
      unitPrice: String(body.unitPrice),
      category: body.category ?? null,
    })
    .returning();

  return c.json(item, 201);
});
