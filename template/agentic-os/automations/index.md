---
type: index
folder: automations
updated: 2026-07-02
---
# automations/ — Scheduled Workflows (Level 1)
Skills promoted to run on a timer (headless `claude -p`). Nothing is enabled until you opt in (cost control).
## Defined
- [[workflow-audit-automation]] — weekly re-scan of sessions → refresh `../WORKFLOW_AUDIT.md`
## Runner
`scripts/run-automation.sh <name>` executes headless and logs to `../runs/`.
## Enable
See each automation note for the launchd/cron snippet. Enabling spends plan/credits — your call.
