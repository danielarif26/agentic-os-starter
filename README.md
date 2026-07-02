# Agentic OS — Starter

Build your own **Agentic OS** for Claude Code: codified skills, self-improving loops, a coherent
memory/state vault, and a local dashboard. Based on the 4-level construct — skills + loop engineering
(L1), memory & state (L2), interface (L3), distribution (L4). **L1 + L2 are ~90% of the value.**

> Hand this to a teammate: one command installs 7 skills and scaffolds the vault. No terminal fear —
> a dashboard turns each skill into a button.

## What's inside
```
skills/                 7 loop-wired Claude Code skills (install to ~/.claude/skills)
template/agentic-os/    the vault operating layer:
  index.md              root map (read first)
  CLAUDE.md             conventions + navigation pattern
  WORKFLOW_AUDIT.md     template — generate your own from your sessions
  raw/ wiki/ outputs/   Karpathy RAG pipeline (unstructured → structured → deliverable)
  runs/                 loop-engineering log (skills read their own history)
  loops/SELF_IMPROVE.md the self-improvement pattern
  skills/               registry + dashboard manifest
  automations/          scheduled workflows (headless claude -p) — opt-in
  dashboard/            local web app (server.mjs + index.html), zero deps
setup.sh                installer
```

## The 7 skills
| Skill | Does |
|---|---|
| `deploy-verify` | verify a deploy is live + on the right domain |
| `localize-humanize` | rewrite machine-translated copy → native, SEO-safe |
| `video-cost-estimate` | itemized $ cost for one video (voice/avatar/render) |
| `episode-package` | script + timeline + thumbnail brief for a video episode |
| `seo-guard` | SEO + llms.txt audit → auto-fix safe / propose risky |
| `skill-onboard` | install a GitHub skill **and** register it |
| `verify-swarm` | 3 independent agents → consensus verdict |

Every skill is **self-improving**: it reads its own `runs/<skill>.md` history before acting and logs
the outcome after (see `loops/SELF_IMPROVE.md`).

## Install
```bash
git clone <this-repo> agentic-os && cd agentic-os
./setup.sh ~/my-vault          # installs skills + scaffolds ~/my-vault/agentic-os
```
Requirements: **Node ≥18**, and the **`claude` CLI** on PATH (for automations/dashboard buttons).

## Use
1. `cd ~/my-vault && claude` — open Claude Code inside your vault.
2. Read `agentic-os/index.md` (the map).
3. Generate your own audit (`WORKFLOW_AUDIT.md` shows the prompt).
4. Trigger skills by phrase — e.g. *"did you deploy?"* fires `deploy-verify`.
5. Dashboard:
   ```bash
   node ~/my-vault/agentic-os/dashboard/server.mjs   # → http://127.0.0.1:4317
   ```

## Dashboard config (env, all optional)
| Var | Default | Meaning |
|---|---|---|
| `AGENTIC_OS_SKILLS_DIR` | `~/.claude/skills` | where SKILL.md dirs live |
| `AGENTIC_OS_VAULT` | parent of `agentic-os/` | vault root for note count |
| `AGENTIC_OS_PORT` | `4317` | dashboard port |

Dashboard binds `127.0.0.1` only. Automation buttons run `claude -p` (spends your plan); only
automations with a def file in `automations/` can run — no arbitrary execution.

## Automations (opt-in)
Nothing is scheduled by default. `automations/workflow-audit-automation.md` includes a macOS launchd
snippet to run a weekly audit. Enabling spends plan/credits — your call.

## License
MIT.
