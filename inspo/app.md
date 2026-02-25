# About Umo (間)

**Umo** (Shona for "You are in"; also playing on the Japanese concept of *Ma*) is a next-generation bill-splitting and expense-tracking application built specifically for the unique financial landscape of **Zimbabwe**.

## The Landscape
In Zimbabwe, transactions are complex. We live in a multi-currency reality where USD and ZiG (Zimbabwe Gold) coexist, but rarely seamlessly. Splitting a dinner bill isn't just about math—it's about arbitrage, exchange rates, and payment methods (Cash, EcoCash, InnBucks, Swipe).

## The Solution
Umo creates a layer of sanity over this chaos. It allows friends to:
1.  **Split expenses in any currency**: Record a bill in USD, settle in ZiG, or vice versa. The app handles the real-time conversion.
2.  **Itemize with precision**: No more "even splits" when someone only had a salad. Select exact items from a receipt.
3.  **Settle instantly**: (Roadmap) Trigger mobile money payments directly from the app via the **Click & Pay OpenAPI**.

## Design Philosophy: "Fluid Fintech"
Most financial apps are cluttered, boxy, and gray. Umo is different.
- **Ma (間)**: We embrace negative space. The interface breathes.
- **Swiss Typography**: Information is presented with strict hierarchy and clarity using *Inter* and *JetBrains Mono*.
- **Natural Feedback**: Every interaction—from toggling a split to claiming an item—is accompanied by fluid, organic animations and haptic feedback.

## Under the Hood
Umo is a technical showcase of modern "Local-First" principles paired with robust serverless infrastructure:
- **Frontend**: React Native (Expo) with Reanimated 3 for 60fps interactions.
- **Backend Service**: A Hono edge API connecting to a serverless Neon Postgres database.
- **Security**: Row Level Security (RLS) baked into the database ensures that your financial data is mathematically private.

## The Future
We are moving beyond just "tracking" debts. By integrating with **Click & Pay**, Umo will close the loop—turning "You owe me $10" into "Payment received" with a single tap, bridging the gap between disparate mobile money wallets and banking rails.
