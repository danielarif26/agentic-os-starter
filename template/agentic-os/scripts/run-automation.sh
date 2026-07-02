#!/usr/bin/env bash
# Headless automation runner (portable). Runs a skill via `claude -p` and logs to runs/.
# Usage: run-automation.sh <automation-name>.  NOTE: `claude -p` consumes your plan/credits.
set -euo pipefail
OS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
NAME="${1:?usage: run-automation.sh <automation-name>}"
DEF="$OS_DIR/automations/${NAME}.md"
[ -f "$DEF" ] || { echo "no automation def: $DEF" >&2; exit 1; }
command -v claude >/dev/null || { echo "claude CLI not found on PATH" >&2; exit 1; }
PROMPT="$(awk '/^## Prompt/{f=1;next} f' "$DEF")"
TS="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
RUNLOG="$OS_DIR/runs/${NAME}.md"
echo "[agentic-os] running '$NAME' headless at $TS"
OUT="$(cd "$OS_DIR" && claude -p "$PROMPT" 2>&1)" && STATUS=PASS || STATUS=FAIL
TMP="$(mktemp)"
{
  echo "## $TS — $NAME — $STATUS"
  echo "- input: automation '$NAME'"
  echo "- lesson: review output; refine automations/${NAME}.md if needed"
  echo ""
  echo "<details><summary>run output</summary>"; echo ""; echo '```'
  echo "$OUT" | head -100; echo '```'; echo "</details>"; echo ""
  [ -f "$RUNLOG" ] && cat "$RUNLOG"
} > "$TMP"; mv "$TMP" "$RUNLOG"
echo "[agentic-os] logged → $RUNLOG ($STATUS)"
