# TRUTH.md - For Crypto Mobile App

## What This Is
React Native + Expo mobile app for ForCrypto. Must be visually identical to https://forcrypto.fun.

## Live URLs
- **Web app**: https://forcrypto.fun
- **Mobile repo**: github.com/yamaonchain/for-crypto-mobile
- **Branch**: `feature/initial-setup`, PR #1 open

## Tech Stack
- React Native + Expo (Expo Router for navigation)
- TypeScript
- Mock data (REST API comes later)

## Web Source Code Location
**`~/for-crypto/src/`** - This is the web app source. READ THESE FILES before building any screen.

Key web source files:
- `~/for-crypto/src/routes/index.tsx` - Homepage
- `~/for-crypto/src/routes/search.tsx` - Search/browse
- `~/for-crypto/src/routes/posts.show.$id.tsx` - Product detail
- `~/for-crypto/src/routes/checkout.$id.tsx` - Checkout
- `~/for-crypto/src/routes/users.show.$id.index.tsx` - Profile
- `~/for-crypto/src/routes/learn.tsx` - Learn page
- `~/for-crypto/src/routes/about.tsx` - About page
- `~/for-crypto/src/routes/categories.tsx` - Categories
- `~/for-crypto/src/layouts/main-layout.tsx` - Main layout/nav
- `~/for-crypto/src/components/` - Shared components

Also check `~/for-crypto/src/styles/` or any CSS/Tailwind config for exact colors, fonts, spacing.

## Mobile App Structure
```
app/
  _layout.tsx          # Root layout
  (tabs)/
    _layout.tsx        # Tab navigator
    index.tsx          # Homepage
    search.tsx         # Search/browse
    profile.tsx        # Profile
    cart.tsx           # Cart
  product/
    _layout.tsx
    [id].tsx           # Product detail
  checkout.tsx         # Checkout flow
  order-confirmation.tsx
src/
  api/                 # API client + mock data
  constants/theme.ts   # Theme/colors
  context/             # React context (cart)
  types/               # TypeScript types
```

## Current State
- Screens exist but do NOT match the web app visually
- Using mock data (acceptable for now)
- No auth/Privy integration yet (deferred)
- Expo tunnel needed for WJP to test on his iPhone via Expo Go

## Design Tokens (from `~/for-crypto/src/app.css`)

The app uses dark mode. These are the EXACT values:

```
background: #0a0a0a
foreground: #e5e5e5
primary (orange): #ff6000
primary-foreground: #ffffff
muted: #1a1a1a
muted-foreground: #a3a3a3
destructive: #ef4444
border: #262626
surface: #171717
card: #1a1a1a
font: Figtree
```

## Design Rules
- **Match the web app exactly** - same colors, fonts, spacing, layout
- Dark theme with the exact hex values above
- Font: Figtree (load via expo-font or Google Fonts)
- Primary accent is `#ff6000` (orange)
- Background is `#0a0a0a` (near-black)
- Mobile-appropriate adaptations are fine (bottom tabs instead of top nav) but the visual identity must be identical
- When in doubt, READ the web source component and translate the Tailwind classes to React Native styles
