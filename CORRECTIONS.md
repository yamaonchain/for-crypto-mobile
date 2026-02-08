# CORRECTIONS.md - Rules Over Repeating

## Git & Version Control
- **Never force push without checking what you're overwriting** - Lost 18 commits of advanced mobile app work during context overflow recovery (learned 2026-02-07)
- Always use `git log --oneline` to verify commit history before force operations
- Use `git stash` for temporary work, not destructive resets
- Commit frequently during development to avoid losing work

## Context Management
- Begin handoff at 70% context window, not 90%
- Write critical state to files during long sessions
- Never assume work persists across restart boundaries