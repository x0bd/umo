# Umo UX/UI & Architecture Strategy

## 1. Design Philosophy: "Fluid Fintech"
**Vibe:** A fusion of Apple's precision and Linear's dark mode aesthetic.
*   **Visual Language:** Deep charcoal/black backgrounds (`#050505`), crisp borders (`#333`), and vibrant, purposeful accent colors.
    *   **Primary Brand:** **Electric Pink** (`#FF1A55` / `#FF0055`) for actions and highlights.
    *   **Secondary:** **Platinum Grey** (`#E6E6E6`) for high-contrast cards against the dark background.
    *   **Text:** Pure White (`#FFFFFF`) on dark, Deep Maroon (`#450010`) on Pink, Dark Grey (`#111111`) on Platinum.
*   **Typography:** `SF Pro Display` / `Inter`. Tight tracking (`-0.04em`) for headings. Monospace for financial data.
*   **Shapes:** Super-rounded cards (`borderRadius: 28px`), vertical "Pill" labels, and dashed connector lines.

## 2. User Flows

### A. The "Speed Split" (Core Loop)
1.  **Initiate:** User taps "+" floating action button (FAB) -> Selects "New Bill".
2.  **Context:**
    *   **Rate Check:** App suggests current ZWG/USD rate. User confirms or adjusts via a haptic dial.
3.  **Input:**
    *   *Option A:* Snap photo of receipt (OCR).
    *   *Option B:* Quick-add items (Name + Amount).
4.  **The Split (The "Magic" Moment):**
    *   Users represented by glowing avatars.
    *   **Interaction:** Drag items to avatars, or tap item -> tap avatars to split.
    *   *Micro-interaction:* Moti layout transitions rearrange items as they are assigned.
5.  **Settlement:**
    *   User sees "My Share" in big bold text (USD & ZWG).
    *   Taps "Settle" -> Selects "EcoCash" (or Cash).
    *   **Paynow Trigger:** A bottom sheet rises, polling status with a sleek progress ring.
    *   **Success:** Full-screen success animation + heavy haptic thud.

### B. The "Micro-Ledger" (Running Tab)
1.  **Scenario:** Someone pays 50c change for another.
2.  **Action:** Long-press friend's avatar on Home -> "Add IOU".
3.  **Result:** Updates the "Balance Graph" on the dashboard.

## 3. Tech Stack & Implementation

*   **Frontend:** Expo (SDK 51+) with **Expo Router**.
*   **Styling:** **Tamagui** (for elite animations, themes, and performance).
    *   *Correction:* Project initialized with Tamagui, replacing NativeWind.
*   **Animations:** Tamagui Animations + Moti.
*   **Backend:** Supabase (Postgres, Edge Functions).

## 4. Screen Architecture

```text
app/
├── (tabs)/
│   ├── index.tsx          # Dashboard (Active Bill / Check Split)
│   ├── scan.tsx           # Camera/OCR (Quick start)
│   ├── activity.tsx       # History/Ledger
│   └── _layout.tsx        # Custom Tab Bar
├── session/
│   ├── [id].tsx           # Active Bill Screen (The Split Interface)
│   ├── finalize.tsx       # Settlement/Paynow Screen
│   └── settings.tsx       # Session Settings (Exchange Rate, Location)
├── modal/
│   ├── add-expense.tsx    # Bottom Sheet for adding items
│   ├── add-friend.tsx     # QR Code or Contact picker
│   └── pay-request.tsx    # Paynow trigger confirmation
└── _layout.tsx            # Root Layout (Tamagui Provider)
```

## 5. Interaction Design Details

### Animations
*   **Entry:** Screens slide up or fade in with spring physics.
*   **Numbers:** Currency amounts `tick` up/down when changing (Slot machine effect).
*   **Lists:** `LayoutLayout` animations when items are removed.

### Haptics
*   `Selection`: `Haptics.selectionAsync()` when scrolling through lists.
*   `Impact`: `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` when toggling splits.

### Components (Visuals)
*   **Vertical Pills:** Rotated text labels (`writing-mode: vertical-rl`) for section headers ("RECEIPT", "MEMBERS").
*   **Flow Steps:** Dashed lines connecting steps in a process (e.g., Currency Conversion).
*   **Avatars:** Ring borders indicate status (Green = Paid, Red = Pending).
