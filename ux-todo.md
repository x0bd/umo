# Umo — UX Build Todo (UI-First)

> Build order: screens top-to-bottom. Backend wired after all UI is complete.
> Stack: NativeWind · Moti · Expo Router · lucide-react-native · @shopify/flash-list
> Mode: **Light** | Dock: **Custom floating bottom tab bar**

---

## Design System (Build First)

- [x] **Tokens** — define in `tailwind.config.js`:
  - Background: `#F4F4F4` (light app bg)
  - Card Pink: `#FF0048` · Pink Text: `#450010`
  - Card Platinum: `#E6E6E6` · Platinum Text: `#111111`
  - Muted text: `#555555`
  - Border/separator: `#CCCCCC`
  - Success: `#00C853`
  - Font mono: `JetBrains Mono` (financial figures)

- [x] **Shared components** (`components/ui/`):
  - [x] `Card.tsx` — rounded-[28px] base card, accepts `variant="pink" | "platinum" | "white"`
  - [x] `VerticalPill.tsx` — rotated uppercase label pill (see inspo); variant pink/gray
  - [x] `FlowLine.tsx` — vertical dashed/solid connector line between flow steps
  - [x] `FlowStep.tsx` — step row: marker dot + label + value (from inspo flow pattern)
  - [x] `Avatar.tsx` — circle avatar with initials, ring color for paid/pending status
  - [x] `PillBadge.tsx` — small horizontal pill (e.g. "USD", "ZiG", "PENDING")
  - [x] `ActionButton.tsx` — full-width pink CTA with right-arrow icon, spring press scale
  - [x] `Dock.tsx` — floating bottom tab bar (pill shape, `#111` bg, 4 icons + center FAB)

---

## Navigation Structure

```
app/
├── _layout.tsx              ← Root layout (SafeAreaProvider, status bar light)
├── index.tsx                ← Redirects → (auth) or (tabs) based on session
├── (auth)/
│   ├── _layout.tsx          ← Stack nav, no header
│   ├── welcome.tsx          ← Splash / landing
│   ├── sign-up.tsx          ← Create account
│   └── sign-in.tsx          ← Sign in
├── (tabs)/
│   ├── _layout.tsx          ← Dock layout (hides native tab bar, renders <Dock />)
│   ├── index.tsx            ← Home / Dashboard
│   ├── activity.tsx         ← History & ledger
│   └── profile.tsx          ← Profile & settings
├── session/
│   ├── new.tsx              ← New session setup (modal sheet)
│   ├── [id].tsx             ← Active session split screen
│   ├── claim.tsx            ← Claim items screen
│   └── settle.tsx           ← Settlement / payment method screen
└── modal/
    ├── add-friend.tsx        ← Add friend by phone/QR
    ├── rate.tsx              ← Set USD ↔ ZiG exchange rate
    └── success.tsx           ← Full-screen success animation
```

---

## Auth Screens

### 1. Welcome Screen (`(auth)/welcome.tsx`)

- [ ] Full light background `#F4F4F4`
- [ ] `MotiView` spring-in logo mark: rounded-[28px] pink square with `間` kanji
- [ ] App name `umo` — 56px, weight 500, tracking -3
- [ ] Tagline: `"Split bills. Settle up. Zimbabwe-style."` — muted grey, 15px
- [ ] Dashed vertical flow line connecting logo → tagline → buttons
- [ ] **"Get Started"** `<ActionButton>` (pink) — navigates to `sign-up`
- [ ] **"Sign In"** ghost button (border `#CCCCCC`, text `#111`) — navigates to `sign-in`
- [ ] Currency badge row at bottom: `USD` · `ZiG` · `EcoCash` horizontal pill badges

### 2. Sign Up Screen (`(auth)/sign-up.tsx`)

- [ ] Back arrow (top-left)
- [ ] Heading: `"Create\nAccount"` — 40px, tracking -1.5
- [ ] Platinum card (`#E6E6E6`, rounded-[28px]) containing form:
  - [ ] Flow step 1 — label `NAME`, input full name
  - [ ] Flow step 2 — label `EMAIL`, input email
  - [ ] Flow step 3 — label `PASSWORD`, input password (masked)
  - [ ] Vertical dashed `<FlowLine />` connecting all 3 steps
  - [ ] `<VerticalPill label="ACCOUNT" variant="gray" />` on left rail
- [ ] `<ActionButton>` — "Create Account →" (pink, full width below card)
- [ ] Footer: `"Already have an account?"` → sign-in link

### 3. Sign In Screen (`(auth)/sign-in.tsx`)

- [ ] Same layout as sign-up, 2 flow steps (EMAIL, PASSWORD)
- [ ] `<VerticalPill label="SIGN IN" variant="gray" />`
- [ ] `<ActionButton>` — "Sign In →"
- [ ] Footer: `"New here?"` → sign-up link

---

## Main App — Dock

### Dock (`components/ui/Dock.tsx`)

- [ ] Floating pill shape, fixed bottom 24px, centered, `mx-6`
- [ ] Background: `#111111`, `rounded-full`, subtle shadow
- [ ] 4 tab icons (lucide): `Home`, `Clock` (Activity), `User` (Profile) — spaced evenly
- [ ] Center **FAB** button: pink circle `#FF0048`, `Plus` icon (white), slightly elevated (shadow)
  - Tapping FAB navigates to `session/new`
- [ ] Active tab: icon turns white, inactive: `rgba(255,255,255,0.4)`
- [ ] `MotiView` spring scale on press for FAB

---

## Main App — Tab Screens

### 4. Home / Dashboard (`(tabs)/index.tsx`)

- [ ] Light background `#F4F4F4`, no native header
- [ ] **Header row**: left `"Good morning,\n{name}"` (32px, tracking -1), right avatar circle
- [ ] **Balance Card** (platinum `#E6E6E6`, rounded-[28px]):
  - [ ] `<VerticalPill label="BALANCE" variant="gray" />` left rail
  - [ ] Flow step: label `YOU ARE OWED` → big green amount (monospace)
  - [ ] Flow step: label `YOU OWE` → big red amount (monospace)
  - [ ] Dashed `<FlowLine />` between steps
  - [ ] Mini currency toggle: `USD` / `ZiG` pill switcher (top-right of card)
- [ ] **Active Sessions** section:
  - [ ] Section header: `"ACTIVE"` — 11px uppercase tracking-widest + count badge
  - [ ] `<FlashList>` of session cards — each card:
    - [ ] Platinum rounded-[20px] card
    - [ ] Venue name (18px bold) + date (muted, 13px)
    - [ ] Member avatar stack (overlapping circles, max 4 shown + "+N")
    - [ ] Your share amount (monospace, pink if you owe, green if you're owed)
    - [ ] Status pill: `OPEN` (green) / `SETTLING` (yellow) / `CLOSED` (gray)
- [ ] **Friends Ledger** section:
  - [ ] Section header: `"FRIENDS"`
  - [ ] Horizontal `FlatList` of friend balance chips:
    - [ ] Circle avatar + name (below) + balance (monospace, colored)
  - [ ] Last chip: `+` button to add friend

### 5. Activity Screen (`(tabs)/activity.tsx`)

- [ ] Header: `"Activity"` 32px tracking -1
- [ ] Filter pill row: `ALL` · `SETTLED` · `PENDING` (horizontal scroll, active = black bg + white text)
- [ ] `<FlashList>` of past sessions — each row:
  - [ ] Left: venue icon placeholder (rounded-[12px] square, gray bg) + venue + date
  - [ ] Right: your share amount + `SETTLED` or `PENDING` pill badge
  - [ ] Separator: 1px `#CCCCCC` line
- [ ] Empty state: centered `<MotiView>` with clock icon + `"No activity yet"` muted text

### 6. Profile Screen (`(tabs)/profile.tsx`)

- [ ] Header: `"Profile"`
- [ ] Profile card (platinum):
  - [ ] Avatar (large, 72px circle) + display name + email
  - [ ] Edit profile button (ghost, right-aligned)
- [ ] Settings list (white card, rounded-[20px]):
  - [ ] Row: `"Default Currency"` → `USD` / `ZiG` toggle
  - [ ] Row: `"Exchange Rate"` → current rate + `"Update"` arrow
  - [ ] Row: `"Notifications"` → toggle switch
  - [ ] Row: `"Linked Wallets"` → EcoCash / InnBucks badge
- [ ] Danger zone: `"Sign Out"` — muted text button (no pink)

---

## Session Flow (Stacked Screens)

### 7. New Session (`session/new.tsx`)

- [ ] Bottom sheet style (modal presentation, slides up)
- [ ] Background `#F4F4F4`, drag handle indicator at top
- [ ] Heading: `"New Bill"` 32px
- [ ] **Pink card** (`#FF0048`):
  - [ ] `<VerticalPill label="SESSION" variant="pink" />`
  - [ ] Flow step: label `VENUE` → text input (56px, transparent bg, pink text)
  - [ ] Flow step: label `DATE` → date picker trigger → shows selected date
  - [ ] Flow step: label `TABLE RATE` → `"1 USD = "` + ZiG amount input (tappable → opens `modal/rate`)
  - [ ] Dashed `<FlowLine />` between steps
- [ ] **Friends row** (below pink card):
  - [ ] Label `"INVITE FRIENDS"` — 11px uppercase
  - [ ] Horizontal scroll: selected friends as avatar chips with `×` to remove
  - [ ] `+` chip to open `modal/add-friend`
- [ ] `<ActionButton>` — `"Start Session →"` creates session, navigates to `session/[id]`

### 8. Active Session (`session/[id].tsx`)

> This is the MONEY SCREEN. Two-card stacked layout (from inspo umo-1).

- [ ] **Left spine** (vertical sidebar, 44px wide):
  - [ ] Thin vertical line
  - [ ] Rotated session name text (vertical-lr) — `"table_04_session"` style
- [ ] **Receipt Card** (platinum `#E6E6E6`, flex-1, tall):
  - [ ] `<VerticalPill label="ITEMIZED FEED" variant="gray" />` — left rail
  - [ ] Card heading: venue name (28px, tracking -0.8)
  - [ ] Dashed `<FlowLine />` from heading to items
  - [ ] **Starters section** — flow step with arrow marker + `<FlashList>` of items:
    - [ ] Each item row: checkbox circle + item name + description + price
    - [ ] Checked = full opacity + filled black circle; unchecked = 40% opacity
    - [ ] Tapping claims/unclaims item (visual only for now, store in local state)
  - [ ] **Mains section** — same pattern
  - [ ] **Drinks section** — same pattern (if applicable)
- [ ] **Your Share Card** (pink `#FF0048`, stacked below, elevated with shadow):
  - [ ] `<VerticalPill label="SETTLEMENT" variant="pink" />`
  - [ ] Heading: `"Your\nShare"` (28px)
  - [ ] Solid `<FlowLine />`
  - [ ] Flow step: label `SUBTOTAL` → amount (monospace)
  - [ ] Flow step: label `TAX & TIP ({rate}%)` → amount
  - [ ] Total block: `"Total Due"` label + big amount (42px monospace, tracking -2)
  - [ ] `<ActionButton variant="dark">` — `"Settle Up →"` → navigates to `session/settle`
- [ ] Members avatars strip at very top (fixed): overlap row with ring status colors
- [ ] Top-right: `"⚙"` icon → session settings (exchange rate, tip %)

### 9. Claim Items (`session/claim.tsx`)

- [ ] Full screen, light bg
- [ ] Header: `"Claim\nYour Items"`
- [ ] Same itemized card as receipt but:
  - [ ] Items appear with MotiView stagger animation on entry
  - [ ] Each item: tap = spring scale bounce + checkbox fill + haptic `selectionAsync`
  - [ ] Shows who else claimed each item (small avatars next to item name)
  - [ ] Shared items split cost automatically (show `/2`, `/3` badge)
- [ ] Bottom sticky: your running total + `<ActionButton>` `"Confirm Claims →"`

### 10. Settlement Screen (`session/settle.tsx`)

- [ ] Header: `"Settle\nUp"`
- [ ] **Amount card** (platinum):
  - [ ] `<VerticalPill label="AMOUNT DUE" variant="gray" />`
  - [ ] Big amount: 56px monospace + currency (USD & ZiG conversion shown below)
  - [ ] Mini flow: `Subtotal → Tip → Total`
- [ ] **Payment Method card** (white, rounded-[28px], border `#CCCCCC`):
  - [ ] Label: `"PAY VIA"` 11px uppercase
  - [ ] Selectable rows (tap = pink left border + checkmark):
    - [ ] 💵 `Cash` — subtext `"Record manual payment"`
    - [ ] 📱 `EcoCash` — subtext `"Sends mobile money prompt"`
    - [ ] 🏦 `InnBucks` — subtext `"InnBucks transfer"`
    - [ ] 💳 `Swipe` — subtext `"Bank card / POS"`
  - [ ] Selected row: `bg-[#FFF0F3]` tint + left pink `3px` border
- [ ] `<ActionButton>` — `"Confirm Payment →"` → navigates to `modal/success`

---

## Modals

### 11. Success Modal (`modal/success.tsx`)

- [ ] Full-screen dark overlay `#050505`
- [ ] `MotiView` spring scale-in: large pink checkmark circle (80px)
- [ ] `MotiText` fade-in: `"Settled!"` 48px white bold
- [ ] Subtext: `"$XX.XX confirmed"` muted white
- [ ] Haptic: `Haptics.notificationAsync(SUCCESS)` on mount
- [ ] Auto-dismiss after 2.5s OR tap to dismiss → back to home

### 12. Add Friend Modal (`modal/add-friend.tsx`)

- [ ] Bottom sheet
- [ ] Heading: `"Add Friend"`
- [ ] Search input: search by name/phone (platinum input, rounded-[16px])
- [ ] Results list: avatar + name + phone — tap to add (spring scale + haptic)
- [ ] OR: QR code scanner tab (uses `expo-camera`)

### 13. Exchange Rate Modal (`modal/rate.tsx`)

- [ ] Bottom sheet, compact
- [ ] Heading: `"Table Rate"`
- [ ] Pink card showing flow: `1 USD` → `{rate} ZiG`
- [ ] Big number input for ZiG rate (56px, monospace)
- [ ] `"Current market: ~{rate}"` muted subtext
- [ ] `<ActionButton>` `"Set Rate →"` — saves to session state

---

## Animations Checklist

- [ ] All screen entries: `MotiView from={{ opacity:0, translateY:20 }} → animate` with spring
- [ ] Item claim tap: `scale 1 → 0.94 → 1` spring bounce + `selectionAsync` haptic
- [ ] Card press: `scale 1 → 0.98` on `activeOpacity` / pressIn
- [ ] FAB press: `scale 1 → 0.9 → 1.05 → 1` spring
- [ ] Share card slides up when items selected (like inspo umo-1)
- [ ] Amount numbers tick/count up on load (`useAnimatedProps` + `runOnJS`)
- [ ] Settlement success: scale-in checkmark + `impactAsync(HEAVY)` haptic
- [ ] Stagger list entry: each item `delay={index * 60}ms`

---

## Light Mode Color Map (Quick Reference)

| Element             | Color                         |
| ------------------- | ----------------------------- |
| App background      | `#F4F4F4`                     |
| Platinum card       | `#E6E6E6` / text `#111111`    |
| Pink card           | `#FF0048` / text `#450010`    |
| White card          | `#FFFFFF` / border `#CCCCCC`  |
| Primary CTA         | `#FF0048` bg / `#450010` text |
| Muted text          | `#555555`                     |
| Separator           | `#CCCCCC`                     |
| Dock bg             | `#111111`                     |
| Success             | `#00C853`                     |
| Mono font (amounts) | JetBrains Mono                |

---

## Build Sequence

```
1. Design system tokens + shared components (Card, VerticalPill, FlowLine, Dock)
2. Auth screens (Welcome → Sign Up → Sign In)
3. Dock layout + tab shell screens (empty placeholders)
4. Home Dashboard (hardcoded mock data)
5. New Session sheet
6. Active Session screen (the core UI)
7. Claim Items screen
8. Settlement screen
9. Success modal
10. Activity + Profile tabs
11. Add Friend + Rate modals
── WIRE BACKEND AFTER ALL ABOVE ──
12. Neon Auth (sign-up / sign-in / session)
13. Neon Data API (sessions, items, claims)
14. Hono + Drizzle server (writes + business logic)
15. EcoCash / Paynow settlement flow
```
