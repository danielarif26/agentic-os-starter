---
type: interface
level: 3
updated: 2026-07-02
---

# Level 3 — Interface (Dashboard)

The visual wrapper. **Optional** — levels 1+2 give 90% of the value. This is the "cherry on top":
a one-stop panel with metrics + buttons that fire your skills/automations.

## How the buttons work (the real mechanic)
A dashboard button calls a **headless** Claude Code — `claude -p "<prompt>"` — so no terminal opens.
Same power as your terminal, invisible. Every button just wraps `scripts/run-automation.sh <name>`.

```
[button] ──click──> claude -p "run skill X" ──> writes to outputs/ ──> logs to runs/
```

> Billing note (from the video): `claude -p` currently pulls from your Max plan (the API-credit
> switch was walked back). Still, treat every button press as spend.

## Two build paths
1. **Web app** — plain web app built with Claude Code. Give it a screenshot of a dashboard you like,
   say "connect to the vault, show these metrics, make each skill a button." Easiest to distribute (GitHub).
2. **Obsidian plugin** — same UI as an Obsidian plugin. "Take the web app and make an Obsidian plugin
   version." Lives inside Obsidian; harder to hand off.

## Metrics worth wiring (from your audit)
- YouTube subs / latest video (your channel) · Vercel deploy status · Claude 5-hr window / token burn
- Buttons: `deploy-verify` · `workflow-audit` · `episode-package` · `seo-guard`

## Built ✅
Working local web app (pure Node, zero deps):
- `server.mjs` — reads the vault live for metrics, serves the UI, fires whitelisted automations headless. Binds `127.0.0.1:4317` only.
- `index.html` — dark command center: metrics + automation "run now" + 7 skill cards (trigger + last run + view runs).

### Run it
```bash
node <vault>/agentic-os/dashboard/server.mjs
# → http://127.0.0.1:4317
```
Or via Claude Code preview: launch config `agentic-os-dashboard` in `~/openrouter/.claude/launch.json`.

### Verified 2026-07-02
Live metrics (7 skills, 3960 vault notes), `/api/state` + `/api/runs` endpoints, view-runs panel — all working.
`run now` executes `scripts/run-automation.sh` (spends plan; only whitelisted automations can run).
