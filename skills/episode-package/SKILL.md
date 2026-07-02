---
name: episode-package
description: >
  Produce a complete YouTube episode package — retention script, Remotion timelineVN.ts scene plan,
  and thumbnail/title brief — ready to drop into your Remotion video pipeline. Self-improving.
  Use when the user says "new episode", "make a video package", "script + timeline", "next
  video". Part of the Agentic OS (Level 1). Does NOT render.
---

# episode-package

One episode → script + scene timeline + thumbnail brief, matching the existing Remotion pipeline.

## Loop (every time)
1. **Before** — read `<vault>/agentic-os/runs/episode-package.md`. Apply `lesson:` (hooks that landed, pacing).

## Pipeline facts (from your Remotion project's CLAUDE.md — verify before writing)
- Episode = `src/data/timelineVN.ts`: array of `SceneSpec` {type, start, end, props}.
- Scene types: `HookScene, DemoVsProdScene, LayerScene, LayerStackScene, RehookScene, InsightScene, ActionScene, OutroScene`.
- `Root.tsx`: register landscape `<Composition>` + `-Vertical` sibling (1080×1920). Avatar = `public/heygen-avatar-0N.mp4`.
- `FaceOverlay` PiP persists over all scenes.

## Deliverables (write to `<vault>/agentic-os/outputs/<episode-slug>/`)
1. **script.md** — full voiceover, retention-engineered: cold-open hook (0–5s), open loop, pattern interrupts, mid-video rehook, CTA, outro. Timestamped to scenes.
2. **timeline.md** — proposed `SceneSpec[]` mapping (type + start/end sec + props) the user pastes into `timelineVN.ts`. Reuse existing scene types only; flag if a new one is needed.
3. **thumbnail-brief.md** — 3 title options (curiosity gap, ≤55 char), thumbnail concept (text ≤4 words, focal image, color/tone), and the hook line.

## After
Append run: episode slug, hook used, scene count, PASS/FAIL, `lesson:`.

## Output to user
Links to the 3 files + the chosen title + a one-paragraph pitch. Next step = paste timeline into `timelineVN.ts`, add Root.tsx compositions, `npm run dev`.

## Never
- Never invent new scene component names as if they exist — only the 8 above. Never render (that's `npx remotion render`, user's call).
