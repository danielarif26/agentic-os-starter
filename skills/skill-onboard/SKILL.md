---
name: skill-onboard
description: >
  Install a skill from a GitHub repo AND register it in the Agentic OS skill registry so it's tracked,
  not lost. Self-improving: logs each onboarding. Use when the user pastes a skill repo URL, says
  "install this skill", "npx skills add", or "add a skill". Agentic OS (Level 1). Complements find-skills.
---

# skill-onboard

Install + register in one step. Fixes the "installed a skill, forgot it exists" churn from the audit.

## Loop (every time)
1. **Before** — read `<vault>/agentic-os/runs/skill-onboard.md`; apply `lesson:` (repos that failed, flags needed).

## Steps
1. Install: `npx skills add <repo-url> --skill <name>` (ask user which skills if repo has many).
2. Verify it landed: check `~/openrouter/.claude/skills/<name>/SKILL.md` or `~/.claude/skills/<name>/`.
3. **Register** — append to `<vault>/agentic-os/skills/index.md` under "Wired / partial":
   `- <name> — <task → output> (from <repo>)`.
4. Read the new SKILL.md `description`; tell user the trigger phrases so they actually use it.

## After
Append run: repo, skills installed, registered Y/N, PASS/FAIL, `lesson:`.

## Output
One line per installed skill: name → trigger phrase → what it produces. Confirm registry updated.

## Never
- Never install without checking the repo source. Never leave a skill unregistered — that's the whole point.
