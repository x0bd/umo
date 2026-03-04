import { pgTable, text, timestamp, uuid, numeric, pgSchema } from 'drizzle-orm/pg-core';

// ─── Neon Auth schema reference ───────────────────────────────────────────────
// Neon Auth manages this schema; we only reference it for FK constraints.
const neonAuth = pgSchema('neon_auth');

export const usersSync = neonAuth.table('users_sync', {
  id: text('id').primaryKey(),
  email: text('email'),
  name: text('name'),
  createdAt: timestamp('created_at', { withTimezone: true }),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

// ─── App tables ───────────────────────────────────────────────────────────────

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => usersSync.id, { onDelete: 'cascade' }),
  displayName: text('display_name').notNull(),
  avatar: text('avatar'),
  phone: text('phone'),
  currencyPref: text('currency_pref').default('USD').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  venue: text('venue'),
  hostId: text('host_id')
    .notNull()
    .references(() => usersSync.id),
  status: text('status').default('open').notNull(), // open | settled | cancelled
  inviteCode: text('invite_code').notNull().unique(),
  totalAmount: numeric('total_amount', { precision: 12, scale: 2 }).default('0').notNull(),
  currency: text('currency').default('USD').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  settledAt: timestamp('settled_at', { withTimezone: true }),
});

export const sessionMembers = pgTable('session_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id')
    .notNull()
    .references(() => sessions.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => usersSync.id),
  guestName: text('guest_name'), // for non-registered participants
  role: text('role').default('member').notNull(), // host | member
  splitMode: text('split_mode').default('auto').notNull(), // auto | custom | cash
  customAmount: numeric('custom_amount', { precision: 12, scale: 2 }),
  joinedAt: timestamp('joined_at', { withTimezone: true }).defaultNow().notNull(),
});

export const items = pgTable('items', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id')
    .notNull()
    .references(() => sessions.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  qty: numeric('qty', { precision: 8, scale: 2 }).default('1').notNull(),
  unitPrice: numeric('unit_price', { precision: 12, scale: 2 }).notNull(),
  category: text('category'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const itemClaims = pgTable('item_claims', {
  id: uuid('id').primaryKey().defaultRandom(),
  itemId: uuid('item_id')
    .notNull()
    .references(() => items.id, { onDelete: 'cascade' }),
  memberId: uuid('member_id')
    .notNull()
    .references(() => sessionMembers.id, { onDelete: 'cascade' }),
  shares: numeric('shares', { precision: 8, scale: 4 }).default('1').notNull(),
});

export const settlements = pgTable('settlements', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id')
    .notNull()
    .references(() => sessions.id, { onDelete: 'cascade' }),
  payerId: text('payer_id')
    .notNull()
    .references(() => usersSync.id),
  payeeId: text('payee_id')
    .notNull()
    .references(() => usersSync.id),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  currency: text('currency').default('USD').notNull(),
  method: text('method'), // cash | transfer | etc.
  settledAt: timestamp('settled_at', { withTimezone: true }).defaultNow().notNull(),
});

export const friends = pgTable('friends', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => usersSync.id, { onDelete: 'cascade' }),
  friendId: text('friend_id')
    .notNull()
    .references(() => usersSync.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
