---
type: agentic-os-root
updated: 2026-07-02
---

# Agentic OS — Root Map

> This is the **map** Claude Code reads first. Every folder below has its own `index.md`.
> Purpose: give the model a clear path to any answer → faster + cheaper (fewer tokens).
> Built from the 4-level construct (Chase AI, *"The Agentic OS Setup That Will 10x Claude Code"*).

## The 4 Levels

| Level | Name | Where it lives | Status |
|-------|------|----------------|--------|
| **1** | Backbone — skills, automations, loop engineering | `skills/`, `automations/`, `loops/` | active |
| **2** | Memory & State — Karpathy RAG (raw→wiki→outputs) | `raw/`, `wiki/`, `outputs/`, `runs/` | active |
| **3** | Interface — dashboard, headless `claude -p` buttons | `dashboard/` | scaffolded |
| **4** | Distribution — share with team/clients | `DISTRIBUTION.md` | documented |

## Navigation (read `CLAUDE.md` for the full rule)

```
Question about...              → go to
─────────────────────────────────────────────
raw research / dumps           → raw/
"what do we know about X"      → wiki/
a deliverable (deck, draft)    → outputs/
"how did past runs of X go"    → runs/
"what skills do I have"        → skills/index.md
"what runs on a schedule"      → automations/index.md
"how do skills self-improve"   → loops/SELF_IMPROVE.md
```

## Data pipeline (Karpathy RAG)

```
raw/  (unstructured)  →  wiki/  (structured)  →  outputs/  (deliverables)
                                   │
                                   └── every run logs to runs/  → loops read runs/ to improve
```

## Files
- [[CLAUDE|CLAUDE.md]] — vault conventions + navigation pattern (Level 2)
- [[WORKFLOW_AUDIT]] — audit of your real Claude Code sessions → skills to build (Level 1)
- [[DISTRIBUTION]] — how to hand this to a team (Level 4)
