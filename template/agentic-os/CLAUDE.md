# Agentic OS — Conventions & Navigation Pattern

This file tells Claude Code how to move through `agentic-os/`. Read it before touching anything here.

## Why this exists
The value of an Agentic OS is **under the hood**: skills, loop engineering, memory/state.
A coherent file structure + an `index.md` at every level = a **map**. With a map, Claude finds any
answer on a short, deterministic path → faster responses, fewer tokens, lower cost.

## Vault conventions

- **`index.md` at every level.** Before reading files in a folder, read its `index.md` first. It is the
  table of contents / router for that folder. Keep it current when you add files.
- **Markdown + wikilinks.** Link related notes with `[[note-name]]`. Backlinks make the graph navigable.
- **Frontmatter** on every note: `type`, `updated`, and `tags` where useful.
- **One idea per file.** Small, linkable notes beat giant documents.

## Navigation pattern (follow this path)

1. Start at `agentic-os/index.md` (root map).
2. Match the question to a folder using the table below.
3. Read that folder's `index.md`.
4. Follow the wikilink to the specific note. Do **not** grep the whole vault first.

| If the question is about… | Go to |
|---|---|
| raw research, transcripts, dumps, screenshots | `raw/` |
| "what do we know about X" (synthesized) | `wiki/` |
| a produced deliverable (deck, draft, script, report) | `outputs/` |
| "how did past runs of skill/automation X perform" | `runs/` |
| available skills and what each produces | `skills/index.md` |
| what runs automatically and on what schedule | `automations/index.md` |
| how a skill improves itself over time | `loops/SELF_IMPROVE.md` |

## Data pipeline (Karpathy RAG — inspiration, not law)

```
raw/ (unstructured)  →  wiki/ (structured)  →  outputs/ (deliverable)
```
Adapt freely. The folders are arbitrary; the **map** is the point. Your existing vault areas
(`brain/`, `Hubs/`, `Platforms/`, `content/`, `work/`) remain the source of truth — `agentic-os/`
is the operating layer that indexes and drives them.

## Loop-engineering rule
Every skill/automation run **must** append a record to `runs/` (see `loops/SELF_IMPROVE.md` for the
schema). Self-improving skills read their own `runs/` history before executing to avoid past mistakes.
