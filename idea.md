# Project Umo: ZW Bill Splitter

## 1. Vision
Umo is a mobile-first bill-splitting application designed for the Zimbabwean market. It solves the "change crisis" and multi-currency confusion (USD/ZiG) by allowing friends to track shared expenses and settle up via **Paynow** (EcoCash/OneMoney/Innbucks).

## 2. Core Features (MVP)
- **Multi-Currency Support:** Set a "Table Rate" for a session. Input in USD, view conversion in ZiG.
- **Payment Method Mixing:** Record who paid with Cash vs. Swipe vs. EcoCash to balance the ledger.
- **Paynow Integration:** Direct settlement flow. Generate EcoCash/OneMoney prompts within the app.
- **Micro-Ledger:** A "Running Tab" for friends to handle small "change" amounts that can't be settled immediately.
- **Expo Scanner:** Use `expo-camera` or `expo-barcode-scanner` for potential QR settlements or receipt logging.

## 3. Tech Stack
- **Frontend:** Expo (SDK 51+) with **Expo Router** (File-based routing).
- **Styling:** **NativeWind v4** (Tailwind CSS for Native).
- **Animations:** **Moti** (Framer Motion API for React Native).
- **Backend/Database:** **Supabase** (Postgres, Auth, Edge Functions).
- **Payment Gateway:** **Paynow Zimbabwe** (via Node.js SDK in Supabase Edge Functions).
- **Icons:** `lucide-react-native`.
- **List Performance:** `@shopify/flash-list`.

## 4. Paynow Integration Strategy
- **Security:** Paynow integration keys must **never** be on the client side.
- **Flow:** 1. Mobile App calls a **Supabase Edge Function** (`/api/initiate-paynow`).
    2. Edge Function uses the `paynow` Node.js SDK to create a `sendMobile` request.
    3. Function returns the `pollUrl` and instructions to the app.
    4. App shows instructions (e.g., "Check your phone for the EcoCash PIN prompt") and polls the status.

## 5. UI/UX Guidelines (For Cursor AI)
- **Theme:** Clean, modern, "Fintech" aesthetic. Use `shadcn-like` components for React Native.
- **Components:** Use `MotiView` for all entry animations.
- **Responsiveness:** Use Tailwind classes (`flex`, `p-4`, `text-xl`) via NativeWind.
- **Feedback:** Use Haptics (`expo-haptics`) for successful bill splits.

## 6. Implementation Checklist
- [ ] Initialize Expo project with NativeWind and Expo Router.
- [ ] Set up Supabase project with `profiles`, `groups`, and `expenses` tables.
- [ ] Create `useRate` hook to fetch/set USD-ZiG exchange rates.
- [ ] Build "Add Expense" screen with itemized split logic.
- [ ] Implement Paynow settlement flow in Supabase Edge Functions.
- [ ] Add "Settle Up" button that triggers EcoCash push notifications.

---

### AI Instructions for Cursor
1. **Never** use `StyleSheet.create`. Always use `className` with NativeWind.
2. **Never** use standard `View` for animations. Always use `MotiView`.
3. Use `expo-router` for all navigation.
4. When writing Paynow logic, assume the `paynow` package is running in a Node.js/Deno environment (Edge Function).
5. Ensure all currency inputs are formatted for 2 decimal places.