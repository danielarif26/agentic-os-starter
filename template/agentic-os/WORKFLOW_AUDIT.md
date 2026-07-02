---
type: workflow-audit
method: session-scan
updated: TEMPLATE
---

# Workflow Audit — Level 1, Step 1 (TEMPLATE)

> Replace this file with **your** audit. Method: have Claude read your recent Claude Code sessions
> and pull out the tasks you repeat, then turn each into a skill.

## How to generate yours
Ask Claude Code:
> "Read my last 10–20 sessions under `~/.claude/projects/<your-project>/*.jsonl`. Pull out repeated
> tasks and domains. Make a chart: task → desired output → proposed skill. Terse."

## Domains detected (example shape)

| Domain | Evidence (recurring prompts) |
|---|---|
| Web build & design | _your sites, design asks_ |
| Deploy | _"did you deploy?", verify loops_ |
| Video / content | _your channel, tooling_ |
| Skill install churn | _repeated `npx skills add …`_ |
| SEO | _audits, llms.txt_ |

## Skills to create (task → output → proposed skill)

| # | Repeated task | Desired output | Proposed skill |
|---|---|---|---|
| 1 | Verify a deploy went live | pass/fail + URL | `deploy-verify` |
| 2 | Humanize translated copy | native copy per locale | `localize-humanize` |
| 3 | Estimate cost of one video | itemized cost sheet | `video-cost-estimate` |
| … | … | … | … |

## Next actions
1. Build the highest-leverage net-new skills via `skill-creator`.
2. Wire a weekly `workflow-audit` automation to keep this fresh.
3. Log every run to `runs/`.
