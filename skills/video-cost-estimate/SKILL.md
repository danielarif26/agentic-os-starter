---
name: video-cost-estimate
description: >
  Produce an itemized cost sheet for ONE YouTube video — voice, avatar, render, tooling —
  in USD. Self-improving: reads past estimates vs actuals, logs after. Use when the user asks
  "how much per video", "cost of this video", "video budget", or plans an episode. Agentic OS (Level 1).
---

# video-cost-estimate

Itemized $ cost for a single episode. Grounds on your real video pipeline.

## Loop (every time)
1. **Before** — read `<vault>/agentic-os/runs/video-cost-estimate.md`. Apply `lesson:` (esp. actual-vs-estimate deltas).
   Standing facts (verify before quoting — see user memory):
   - **ElevenLabs**: key is pay-as-you-go; (if a cloned voice is unavailable on your plan, use a stock pro voice). Price per 1k chars, count script chars.
   - **HeyGen avatar**: credits/minute of avatar video — count final runtime minutes.
   - **Remotion render**: local = compute/time only (≈ $0 cash) unless cloud render used.
   - **Claude/API**: script + package generation tokens (usually plan-covered).

## Steps
1. Get inputs: script length (chars), final runtime (min), languages/variants (longform + vertical Short).
2. Line items: voiceover (chars × EL rate), avatar (min × HeyGen rate), render (local≈0 or cloud), thumbnail, misc.
3. Multiply by variant count (landscape + vertical + per-language).
4. Show **per-video total** + **per-variant breakdown** + assumptions/rates used.

## After
Append run: inputs, estimated total, (later) actual, `lesson:` on any rate drift.

## Output to user
Markdown cost table, USD, one total line. State every rate assumption so it's auditable.

## Never
- Never quote a rate without labeling it an assumption if unverified. Never omit the variant multiplier.
