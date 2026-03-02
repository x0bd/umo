# Umo (間)

Bill splitting for Zimbabwe's multi-currency reality.

---

## What it does

Splitting a bill in Zimbabwe isn't simple math — it's USD vs ZiG, cash vs EcoCash vs InnBucks, different exchange rates at different tables. Umo handles all of it. Record a bill in USD, settle in ZiG, let everyone pay their way (or mark it as cash already paid), and track who owes what across sessions.

## Core features

- **Multi-currency splits** — USD and ZiG with live table exchange rates
- **Itemised receipts** — add items with quantity multipliers ("Drinks x3")
- **Flexible payment modes** — Auto (equal share), Custom (fixed amount), Cash (settled immediately)
- **Session history** — pending debts, settled bills, who owes what
- **Local-first** — works offline, syncs when connected

## Stack

| Layer      | Tech                                  |
| ---------- | ------------------------------------- |
| Mobile     | React Native (Expo), NativeWind, Moti |
| Animations | Reanimated 3                          |
| Backend    | Hono edge API, Neon Postgres          |
| Auth       | Expo Secure Store                     |
| State      | Zustand                               |

## Getting started

```sh
pnpm install
pnpm start          # Expo dev server
pnpm ios            # iOS simulator
pnpm android        # Android emulator
```

Requires Node 20+ and the Expo Go app or a local simulator.

## Design

Umo is built on the _Ma_ (間) philosophy — negative space, Swiss typography, no decoration that doesn't earn its place. The design system is documented in [`inspo/exports/design-system.html`](inspo/exports/design-system.html).

## Roadmap

- [ ] Click & Pay integration (one-tap mobile money settlement)
- [ ] Receipt OCR via camera
- [ ] Real-time exchange rate feed
- [ ] Group sessions with shared links
