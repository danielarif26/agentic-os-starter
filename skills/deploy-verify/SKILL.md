---
name: deploy-verify
description: >
  Verify a Vercel deployment actually went live and serves the correct production domain.
  Self-improving: reads its own run history before checking and logs the outcome after.
  Use when the user asks "did you deploy?", "is it live?", "verify the deploy", "check vercel",
  or after any Vercel deploy. Part of the Agentic OS (Level 1 backbone).
---

# deploy-verify

Confirms a Vercel deploy is live + on the right domain. Loop-engineered: it learns from past runs.

## Loop (do this every time)

1. **Before checking** — read the last ~5 entries of
   `<vault>/agentic-os/runs/deploy-verify.md` (if it exists). Honor each `lesson:`.
   Known lessons for this repo family:
   - Read `vercel.json` `alias`/domain BEFORE hitting a URL — don't assume the domain.
   - Vercel Hobby can BLOCK deploys unless the commit author matches the account owner email (check your
     git identity). If deploy is stuck, check `git log -1 --format='%ae'` first.

2. **Verify:**
   - Determine the intended production domain from `vercel.json` (`alias`) or the project config —
     never guess.
   - `curl -sI -o /dev/null -w '%{http_code} %{url_effective}\n' https://<domain>/` → expect 2xx.
   - Optionally query Vercel API for the latest deployment `readyState` (want `READY`, not `ERROR`/`BUILDING`).
   - Spot-check one localized/inner page too (user runs multilingual sites).

3. **After checking** — append a record (newest on top) to
   `<vault>/agentic-os/runs/deploy-verify.md`:

   ```markdown
   ## <ISO-datetime> — deploy-verify — <PASS|FAIL|PARTIAL>
   - input: <domain checked>
   - output: <http code + readyState>
   - lesson: <what to remember next time>
   ```

## Output to user
Terse verdict: `LIVE ✅ <domain> (200, READY)` or `NOT LIVE ❌ <reason> → <fix>`.

## Never
- Never claim "deployed" without an actual HTTP check.
- Never trigger a new deploy — this skill only *verifies*.
