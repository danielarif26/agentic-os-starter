---
type: distribution
level: 4
updated: 2026-07-02
---

# Level 4 — Distribution

Hand the OS to teammates/clients so they get Claude Code's power **without** touching the terminal.
Because all power lives in skills/automations (L1) + memory (L2), a one-click wrapper "spins them up
on Claude Code without spinning them up on Claude Code."

## Options

| Deliverable | Ease | How |
|---|---|---|
| **Web-app dashboard** | easy | Push to GitHub → they `git clone`, point at their own vault, run. Buttons call headless `claude -p`. |
| **Obsidian plugin** | harder | You install + wire it per user. No clone-and-go; hands-on setup. |
| **Skill bundle only** | easy | Share the `skills/` set + `WORKFLOW_AUDIT.md`; they `npx skills add`. |

## The "floor-raising" idea
Non-technical people won't touch the terminal. A dashboard with a few labelled buttons (+ optional
local voice) changes how they engage — same output, no fear. Set it up once, they just press.

## Recommended for you
Start web-app path (your team/clients). Keep secrets out of the repo. Each user brings their
own Claude subscription; the OS is just the wrapper + skills + vault structure.
