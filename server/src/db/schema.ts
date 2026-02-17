import { relations } from 'drizzle-orm'
import {
  index,
  integer,
  numeric,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

// ============================================
// NEON AUTH — Reference the managed schema
// ============================================
const neonAuth = pgSchema('neon_auth')

export const neonAuthUsers = neonAuth.table('user', {
  // Neon Auth user IDs are UUIDs – mirror that here so FKs can attach cleanly
  id: uuid('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name'),
  image: text('image'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

// ============================================
// PROFILES — Extended user data
// ============================================
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => neonAuthUsers.id, { onDelete: 'cascade' }),
  displayName: text('display_name').notNull(),
  avatarUrl: text('avatar_url'),
  phone: varchar('phone', { length: 20 }),
  currencyPreference: varchar('currency_preference', { length: 3 })
    .notNull()
    .default('USD'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ============================================
// SESSIONS — Bill splitting sessions
// ============================================
export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    venue: text('venue'),
    currency: varchar('currency', { length: 3 }).notNull().default('USD'),
    inviteCode: varchar('invite_code', { length: 6 }).notNull().unique(),
    status: varchar('status', { length: 20 }).notNull().default('active'),
    // active | finalized | settled
    totalAmount: numeric('total_amount', { precision: 12, scale: 2 }).default(
      '0'
    ),
    hostId: uuid('host_id')
      .notNull()
      .references(() => neonAuthUsers.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [index('sessions_host_idx').on(table.hostId)]
)

// ============================================
// SESSION MEMBERS
// ============================================
export const sessionMembers = pgTable(
  'session_members',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    sessionId: uuid('session_id')
      .notNull()
      .references(() => sessions.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => neonAuthUsers.id),
    role: varchar('role', { length: 10 }).notNull().default('member'),
    // host | member
    joinedAt: timestamp('joined_at').defaultNow().notNull(),
  },
  (table) => [index('session_members_session_idx').on(table.sessionId)]
)

// ============================================
// ITEMS — Line items on a bill
// ============================================
export const items = pgTable(
  'items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    sessionId: uuid('session_id')
      .notNull()
      .references(() => sessions.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    price: numeric('price', { precision: 12, scale: 2 }).notNull(),
    quantity: integer('quantity').notNull().default(1),
    category: varchar('category', { length: 30 }),
    addedBy: uuid('added_by').references(() => neonAuthUsers.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('items_session_idx').on(table.sessionId)]
)

// ============================================
// ITEM CLAIMS — Who claimed what
// ============================================
export const itemClaims = pgTable(
  'item_claims',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    itemId: uuid('item_id')
      .notNull()
      .references(() => items.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => neonAuthUsers.id),
    share: numeric('share', { precision: 5, scale: 2 })
      .notNull()
      .default('1'),
    // 1 = full claim, 0.5 = split between 2, etc.
    claimedAt: timestamp('claimed_at').defaultNow().notNull(),
  },
  (table) => [index('item_claims_item_idx').on(table.itemId)]
)

// ============================================
// SETTLEMENTS — Payment records
// ============================================
export const settlements = pgTable('settlements', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id')
    .notNull()
    .references(() => sessions.id, { onDelete: 'cascade' }),
  payerId: uuid('payer_id')
    .notNull()
    .references(() => neonAuthUsers.id),
  payeeId: uuid('payee_id')
    .notNull()
    .references(() => neonAuthUsers.id),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  method: varchar('method', { length: 20 }),
  // ecocash | onemoney | cash | bank
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  // pending | confirmed | disputed
  settledAt: timestamp('settled_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ============================================
// FRIENDS
// ============================================
export const friends = pgTable('friends', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => neonAuthUsers.id),
  friendId: uuid('friend_id')
    .notNull()
    .references(() => neonAuthUsers.id),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  // pending | accepted | blocked
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ============================================
// RELATIONS
// ============================================
export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(neonAuthUsers, {
    fields: [profiles.userId],
    references: [neonAuthUsers.id],
  }),
}))

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  host: one(neonAuthUsers, {
    fields: [sessions.hostId],
    references: [neonAuthUsers.id],
  }),
  members: many(sessionMembers),
  items: many(items),
  settlements: many(settlements),
}))

export const sessionMembersRelations = relations(
  sessionMembers,
  ({ one }) => ({
    session: one(sessions, {
      fields: [sessionMembers.sessionId],
      references: [sessions.id],
    }),
    user: one(neonAuthUsers, {
      fields: [sessionMembers.userId],
      references: [neonAuthUsers.id],
    }),
  })
)

export const itemsRelations = relations(items, ({ one, many }) => ({
  session: one(sessions, {
    fields: [items.sessionId],
    references: [sessions.id],
  }),
  claims: many(itemClaims),
}))

export const itemClaimsRelations = relations(itemClaims, ({ one }) => ({
  item: one(items, {
    fields: [itemClaims.itemId],
    references: [items.id],
  }),
  user: one(neonAuthUsers, {
    fields: [itemClaims.userId],
    references: [neonAuthUsers.id],
  }),
}))

export const settlementsRelations = relations(settlements, ({ one }) => ({
  session: one(sessions, {
    fields: [settlements.sessionId],
    references: [sessions.id],
  }),
}))
