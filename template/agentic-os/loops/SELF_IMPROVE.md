---
type: pattern
updated: 2026-07-02
---

# Loop Engineering — Self-Improving Skills (Level 1, phase 4)

The backbone of the OS. A skill is *self-improving* when it **reads its own past runs before executing**
and adjusts. State (`../runs/`) + skills = a loop.

## The loop

```
run skill  →  log outcome to runs/<skill>.md  →  next run reads runs/<skill>.md first
      ↑                                                      │
      └──────────────── adjust behavior ←────────────────────┘
```

## Run-record schema (append to `runs/<skill>.md`, newest on top)

```markdown
## <ISO-datetime> — <skill> — <PASS|FAIL|PARTIAL>
- input: <what it was asked to do>
- output: <what it produced / link to outputs/>
- cost: <tokens or $ if known>
- lesson: <what to do differently next time — the signal the next run reads>
```

## How a skill uses the loop (put this in the skill's SKILL.md)

1. **Before work:** read the last ~5 entries of `runs/<skill>.md`. Extract `lesson:` lines.
2. **Do work**, honoring those lessons.
3. **After work:** append a new record. Always write a `lesson:` even on PASS ("kept X, it worked").

## Example — `deploy-verify` loop
- Run 1 FAIL, lesson: "checked wrong domain; read vercel.json `alias` first."
- Run 2 reads that lesson → checks `vercel.json` alias before hitting the URL → PASS.

That is the entire mechanism. No dashboard required — this is 90% of the value.
