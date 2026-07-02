#!/usr/bin/env bash
# Agentic OS starter installer.
# 1) installs the 7 skills into ~/.claude/skills   2) scaffolds agentic-os/ into your vault
# Usage: ./setup.sh [VAULT_DIR]   (default: ./my-vault)
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
VAULT="${1:-$PWD/my-vault}"
SKILLS_DEST="$HOME/.claude/skills"

echo "==> Installing skills to $SKILLS_DEST"
mkdir -p "$SKILLS_DEST"
for d in "$HERE/skills/"*/; do
  name="$(basename "$d")"
  mkdir -p "$SKILLS_DEST/$name"
  cp "$d/SKILL.md" "$SKILLS_DEST/$name/SKILL.md"
  echo "   + $name"
done

echo "==> Scaffolding agentic-os into $VAULT/agentic-os"
mkdir -p "$VAULT"
cp -R "$HERE/template/agentic-os" "$VAULT/agentic-os"
chmod +x "$VAULT/agentic-os/scripts/run-automation.sh" 2>/dev/null || true

cat <<DONE

✅ Done.
   Skills:    $SKILLS_DEST  (7 installed — restart Claude Code to load)
   Vault OS:  $VAULT/agentic-os

Next:
   1) Open Claude Code inside your vault:   cd "$VAULT" && claude
   2) Read the map:                          $VAULT/agentic-os/index.md
   3) Generate YOUR workflow audit (see WORKFLOW_AUDIT.md).
   4) Start the dashboard:
        node "$VAULT/agentic-os/dashboard/server.mjs"   # → http://127.0.0.1:4317
   Requires: node >=18, and the \`claude\` CLI on PATH for automations.
DONE
