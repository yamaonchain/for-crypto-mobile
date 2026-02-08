# CLAUDE.md - Project Rules for For Crypto Mobile

## Session Start Protocol
1. Read `TRUTH.md` - what this project is, tech stack, design tokens
2. Read `TASKS.md` - what to work on, what's done
3. Read `HANDOFF.md` - context from last session

Do this EVERY session before touching code.

## Working Rules
- Read the web source file BEFORE building any screen. Source is at `~/for-crypto/src/`
- Use the exact design tokens from TRUTH.md (dark theme, #ff6000 orange, #0a0a0a background, Figtree font)
- Commit after each screen: `git add -A && git commit -m "feat: rebuild [Screen] to match web" && git push`
- Update TASKS.md checkboxes as you complete items
- Write HANDOFF.md at end of session

## Communication
- Do NOT message Discord with status updates or file dumps
- Post ONE message when ALL screens are done with the Expo tunnel URL
- If truly blocked on something only a human can fix, post ONE message explaining the blocker

## Update Cycle
After completing work:
1. `git add -A && git commit && git push`
2. Update TASKS.md (check off completed items)
3. Update TRUTH.md if architecture changed
4. Write HANDOFF.md for next session
