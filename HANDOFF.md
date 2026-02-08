# HANDOFF.md - For Crypto Mobile App

## Project
React Native + Expo mobile app for ForCrypto. Must visually match https://forcrypto.fun.

## Current State
- Screens exist but DO NOT match the web app. WJP rejected current state.
- The web source code is at `~/for-crypto/src/` (NOT `~/reference/` - that path was wrong)
- Mock data is fine for now. Visual parity is the only goal.

## What Needs to Happen
1. Read `TRUTH.md` and `TASKS.md` in this directory
2. For EACH screen in TASKS.md:
   a. Read the corresponding web source file
   b. Extract exact colors, fonts, spacing, layout from the web code
   c. Rebuild the mobile screen to match
   d. Commit: `git add -A && git commit -m "feat: rebuild [Screen] to match web" && git push`
3. Start the Expo tunnel: `npx expo start --tunnel`
4. Post ONE message to Discord #yama with the tunnel URL when done

## Critical Context
- WJP is testing on his physical iPhone via Expo Go
- The previous builds looked nothing like the web app. That's why we're rebuilding.
- Web source is at `~/for-crypto/src/routes/` for pages, `~/for-crypto/src/layouts/` for layout, `~/for-crypto/src/components/` for shared components
- Check `~/for-crypto/tailwind.config.*` or `~/for-crypto/app.css` or similar for exact theme colors

## Blockers
- None. Everything needed is on the machine.

## DO NOT
- Message Discord with status updates or file contents
- Guess what the web app looks like - READ THE SOURCE
- Skip screens
- Start Phase 2 (API) before Phase 1 is approved
