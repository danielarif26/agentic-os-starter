---
type: index
folder: skills
updated: 2026-07-02
---
# skills/ — Skill Registry (Level 1)
Map of skills that power this OS. Global skills live in `~/.claude/skills` and `~/openrouter/.claude/skills`; this indexes the ones wired into the vault workflow.
## Built ✅ (loop-wired → `~/openrouter/.claude/skills/`)
- `deploy-verify` — verify Vercel deploy live + domain
- `localize-humanize` — humanize translated copy per locale, SEO-safe
- `video-cost-estimate` — itemized $ cost sheet for one video
- `episode-package` — episode script + timeline + thumbnail brief
- `seo-guard` — SEO + llms.txt safe-fix pass (audit → auto-fix safe / propose risky)
- `skill-onboard` — install a GitHub skill + auto-register it here
- `verify-swarm` — 3-agent independent consensus verification

_All 7 audit skills built. Full backbone complete._

## Wired / partial
- `find-skills`, `seo`, `verify`, `graphify`, `caveman`, `skill-creator`
## Onboarding a skill
Add via `npx skills add <repo> --skill <name>`, then append a line here: `- <name> — task → output`.
