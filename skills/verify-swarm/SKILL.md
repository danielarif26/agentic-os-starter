---
name: verify-swarm
description: >
  Verify a change/claim/test with multiple independent agents and return a consensus verdict —
  not one agent's guess. Self-improving: logs verdicts vs reality. Use when the user says "verify with
  agents", "verify using multiple agents", "make sure it works", "run all tests and verify". Agentic OS (Level 1).
---

# verify-swarm

Independent multi-agent verification → majority verdict. Kills plausible-but-wrong "it works" claims.

## Loop (every time)
1. **Before** — read `<vault>/agentic-os/runs/verify-swarm.md`; apply `lesson:` (false-pass patterns).

## Method
1. Define the claim precisely + the observable pass criteria (test output, HTTP code, rendered UI, file state).
2. Spawn **3 independent agents** (Task tool, `general-purpose` or `production-validator`), each told to
   **try to REFUTE** the claim — default to FAIL if evidence is missing.
3. Each returns `{verdict: PASS|FAIL, evidence, reason}`.
4. **Consensus:** PASS only if ≥2/3 PASS *with concrete evidence*. Any FAIL with real evidence → investigate, don't average away.

## After
Append run: claim, 3 verdicts, consensus, PASS/FAIL, `lesson:` (esp. if consensus was later proven wrong).

## Output
Verdict line + per-agent evidence table. If FAIL, the specific failing evidence + suggested fix.

## Never
- Never call PASS on assertion alone — require evidence per agent. Never run the 3 with identical prompts
  when the claim can fail multiple ways — give each a distinct lens (does it build / does it run / does it regress).
