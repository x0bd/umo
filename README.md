# Umo (間)

**Split bills. Settle debts. The simple way.**

Umo is a modern bill-splitting application built for Zimbabwe, designed to handle multi-currency complexity (USD ↔ ZiG) with a refined, minimalist aesthetic. It blends Japanese design philosophy (Ma, restraint), Swiss typography, and Apple's premium feel into a "Fluid Fintech" experience.

![App Screenshot](https://images.unsplash.com/photo-1616077644586-461538350c55?q=80&w=2070&auto=format&fit=crop) *(Placeholder)*

## ✨ Philosophy

- **Ma (間)**: The space between. We removed everything until it broke, then added one thing back.
- **In Praise of Shadows**: Depth is achieved through diffuse shadows, not borders.
- **Fluid Fintech**: Interfaces that feel alive, responsive, and premium.

## 🛠 Tech Stack

**Client**
- **Framework**: React Native (Expo SDK 52)
- **Styling**: Tamagui (Universal styling system)
- **Animations**: Reanimated 3 (Fluid gestures & transitions)
- **Auth**: `@neondatabase/neon-js` (Auth + Data API)

**Backend**
- **Database**: Neon Postgres (Serverless, branching)
- **ORM**: Drizzle ORM (Type-safe, SQL-like)
- **API**: Hono (Edge-ready, lightweight) running on Node.js
- **Auth Provider**: Neon Auth (Powered by Better Auth)

## 🚀 Key Features

- **Multi-Currency Core**: Seamlessly handle USD and ZiG splits with real-time exchange rates.
- **Smart Splitting**: Itemized receipt splitting — select who ate what, not just even splits.
- **Privacy First**: Row Level Security (RLS) ensures data isolation at the database level.
- **Instant Settlement**: (Coming Soon) Direct integration with EcoCash/OneMoney via **Click & Pay OpenAPI**.

## 🔌 Integration Roadmap

We are actively building integrations with the **Click & Pay OpenAPI** to enable:
- **Direct Mobile Money Triggers**: Push USSD prompts directly to users' phones.
- **Real-time Settlement**: Instant confirmation of peer-to-peer payments.
- **Merchant Payments**: Pay the restaurant directly from the app.

## 📦 Project Structure

```bash
umo/
├── app/                  # Expo Router (Client screens)
├── components/           # UI primitives (Buttons, Cards, Inputs)
├── lib/                  # Client-side utilities (Neon client)
├── providers/            # React Context (Auth, Theme)
├── server/               # Hono API & Drizzle ORM
│   ├── src/
│   │   ├── db/           # Schema & Connection
│   │   ├── routes/       # API Endpoints
│   │   └── middleware/   # Auth Validation
│   └── drizzle/          # SQL Migrations
└── services/             # Currency conversion logic
```

## 🏁 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/umo.git
   cd umo
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd server && npm install
   ```

3. **Set up environment**
   Create a `.env` file in the root and `server/.env` based on the examples. You will need a standard **Neon** project with Auth enabled.

4. **Run the development server**
   ```bash
   # Terminal 1: Expo Client
   npx expo start

   # Terminal 2: API Server
   cd server && npm run dev
   ```

## 📄 License

MIT

---

*Crafted with 🖤 by [Your Name]*
