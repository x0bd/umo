# Backend — Neon Auth + Drizzle + Hono

## Architecture

```
React Native (Expo)
├── @neondatabase/neon-js  →  Neon Auth API (signUp/signIn/sessions)
├── @neondatabase/neon-js  →  Neon Data API (select/insert with RLS)
└── fetch()                →  Hono Server (business logic)
                                └── Drizzle ORM → Neon Postgres
```

**Client** (`@neondatabase/neon-js`): handles auth (signup, signin, sessions) and simple reads via Data API + RLS.
**Server** (Hono + Drizzle): handles writes and business logic — creating splits, calculating shares, triggering payments, sending notifications.

## Stack

| Layer | Technology |
|---|---|
| Database | Neon Postgres (serverless) |
| Auth | Neon Auth (built on Better Auth) — `@neondatabase/neon-js` |
| ORM | Drizzle ORM (`drizzle-orm/neon-serverless`) |
| API Server | Hono (`server/` folder) |
| Client | Expo / React Native |

## Schema

> Neon Auth auto-manages `neon_auth.users_sync`. We reference it via FK — no custom users table.

| Table | Purpose |
|---|---|
| `profiles` | Extended user data (display name, avatar, phone, currency pref) — FK to `neon_auth.users_sync.id` |
| `sessions` | Bill splitting sessions (venue, date, status, invite code) |
| `session_members` | Who's in each session + role (host/member) |
| `items` | Line items on a bill (name, price, category) |
| `item_claims` | Which member claimed which item |
| `settlements` | Payment records between members |
| `friends` | Friend relationships between users |

## API Routes (Hono)

```
POST   /sessions              Create a split session
GET    /sessions              List user's sessions
GET    /sessions/:id          Session detail + items + members
POST   /sessions/:id/items    Add items
POST   /sessions/:id/claim    Claim items
POST   /sessions/:id/settle   Record settlement

GET    /friends               List friends
POST   /friends/add           Add friend by email/phone
DELETE /friends/:id           Remove friend

GET    /exchange/rate          Current USD ↔ ZiG rate
```

## Client Auth Flow

```
Onboarding → Create Account (signUp.email) → Home
                                            ↗
Sign In (signIn.email) ─────────────────────
```

- `lib/neon.ts` — initialize `@neondatabase/neon-js` client
- `providers/auth.tsx` — React context: `user`, `session`, `isLoading`, `signOut`
- RLS policies secure all Data API reads by JWT

## Project Structure

```
umo/
├── app/                  ← Expo (React Native)
├── lib/neon.ts           ← Neon JS client init
├── providers/auth.tsx    ← Auth context
├── server/
│   ├── src/
│   │   ├── db/
│   │   │   ├── schema.ts
│   │   │   └── index.ts
│   │   ├── middleware/auth.ts
│   │   ├── routes/
│   │   │   ├── sessions.ts
│   │   │   ├── friends.ts
│   │   │   └── exchange.ts
│   │   └── index.ts
│   ├── drizzle.config.ts
│   └── package.json
└── packages/shared/      ← Shared types
```
