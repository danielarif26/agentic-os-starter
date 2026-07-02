---
type: automation
skill: workflow-audit
schedule: weekly (Mon 09:00)
enabled: true  # launchd loaded 2026-07-02 → com.agenticos.workflow-audit
updated: 2026-07-02
---

# Automation — Weekly Workflow Audit

Re-runs the Level 1 audit: scans recent Claude Code sessions, refreshes the skills chart in
`../WORKFLOW_AUDIT.md`, and logs to `../runs/workflow-audit.md`.

## Run now (headless)
```bash
<vault>/agentic-os/scripts/run-automation.sh workflow-audit-automation
```

## Enable weekly (macOS launchd) — opt-in, spends plan
Create `~/Library/LaunchAgents/com.agenticos.workflow-audit.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.agenticos.workflow-audit</string>
  <key>ProgramArguments</key><array>
    <string>/bin/bash</string>
    <string><AGENTIC_OS>/scripts/run-automation.sh</string>
    <string>workflow-audit-automation</string>
  </array>
  <key>StartCalendarInterval</key><dict><key>Weekday</key><integer>1</integer><key>Hour</key><integer>9</integer><key>Minute</key><integer>0</integer></dict>
  <key>StandardErrorPath</key><string>/tmp/agenticos-audit.err</string>
  <key>StandardOutPath</key><string>/tmp/agenticos-audit.out</string>
</dict></plist>
```
Then: `launchctl load ~/Library/LaunchAgents/com.agenticos.workflow-audit.plist`
Disable: `launchctl unload …` and set `enabled: false` above.

## Prompt
You are running the weekly workflow audit for the Agentic OS. Read the most recent Claude Code
session transcripts under ~/.claude/projects/<your-project>/ (the *.jsonl files).
Extract the user's recurring tasks and domains. Compare against the existing skills chart in
<vault>/agentic-os/WORKFLOW_AUDIT.md. Update that file's tables with any NEW recurring tasks,
mark which proposed skills now exist, and keep it terse. Do not delete history. Save the file.
Then append a one-line summary to <vault>/agentic-os/runs/workflow-audit.md.
