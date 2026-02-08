# TASKS.md - For Crypto Mobile App

## Current Priority: Visual Parity with Web App

Every screen must match https://forcrypto.fun exactly. Use mock data. Read web source at `~/for-crypto/src/` before building each screen.

### Phase 1: Screen Rebuild (NOW)

For each screen: read the web source file, extract exact colors/spacing/layout, rebuild the mobile screen to match.

- [ ] **Homepage** (`app/(tabs)/index.tsx`)
  - Web source: `~/for-crypto/src/routes/index.tsx`
  - Hero section, featured listings, categories, how it works
  - Must match web layout, colors, typography exactly

- [ ] **Search/Browse** (`app/(tabs)/search.tsx`)
  - Web source: `~/for-crypto/src/routes/search.tsx`
  - Filter bar, product grid, trending tags
  
- [ ] **Product Detail** (`app/product/[id].tsx`)
  - Web source: `~/for-crypto/src/routes/posts.show.$id.tsx`
  - Images, price, description, buy/cosell buttons, reviews

- [ ] **Profile** (`app/(tabs)/profile.tsx`)
  - Web source: `~/for-crypto/src/routes/users.show.$id.index.tsx`
  - User info, listings, earnings

- [ ] **Checkout** (`app/checkout.tsx`)
  - Web source: `~/for-crypto/src/routes/checkout.$id.tsx`
  - Payment flow

- [ ] **Learn** (create if missing)
  - Web source: `~/for-crypto/src/routes/learn.tsx`

- [ ] **About** (create if missing)
  - Web source: `~/for-crypto/src/routes/about.tsx`

- [ ] **Theme/Colors extracted** from web app CSS/Tailwind
  - Update `src/constants/theme.ts` with exact hex values from web

- [ ] **Expo tunnel running** and URL posted to Discord #yama

- [ ] **All screens visually verified** against live site

### Phase 2: REST API Integration (AFTER Phase 1 approved)
- Not started. Waiting for Phase 1 sign-off from WJP.

### Phase 3: Auth + App Store (FUTURE)
- Privy SDK integration
- Apple Developer Program enrollment ($99)
- App Store submission

## Completed
- [x] Initial Expo project setup
- [x] Tab navigation structure
- [x] Basic screen scaffolding
- [x] Mock data layer
- [x] Cart context
