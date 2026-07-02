---
name: localize-humanize
description: >
  Rewrite machine-translated website copy so it reads like a native human wrote it, across every
  locale, without breaking SEO or llms.txt. Self-improving: reads its run history first, logs after.
  Use when the user says "feels like google translate", "make it human", "humanize the copy",
  "all languages", or is localizing a multilingual site. Part of the Agentic OS (Level 1).
---

# localize-humanize

Turns robotic translated copy into native-sounding copy per language, SEO-safe.

## Loop (every time)
1. **Before** — read last ~5 entries of `<vault>/agentic-os/runs/localize-humanize.md`. Honor each `lesson:`.
   Standing lessons:
   - Never touch `<title>`, meta description, `hreflang`, canonical, JSON-LD, or `llms.txt` keys — rewrite prose only.
   - Keep keyword targets intact; rephrase around them, don't drop them.
   - French sites, e.g.: formal "vous", no anglicisms, no literal EN idioms.

## Steps
1. Identify locales + files (i18n dirs, `messages.*.json`, `[lang]/` routes). List them before editing.
2. For each string: rewrite for the **target language natively** — idiom, rhythm, register of a native speaker.
   Not a re-translation of English; think "how would a local write this from scratch."
3. Preserve: placeholders (`{name}`, `%s`), markup, links, SEO tags, key order in JSON.
4. Spot-check length — some languages expand; ensure UI doesn't break (note overflow risks).

## After
Append to `runs/localize-humanize.md` (newest top): datetime, locales touched, files, PASS/FAIL, `lesson:`.

## Output to user
Table: locale → files changed → sample before/after line. Flag any string you left untouched + why.

## Never
- Never mass-replace without listing files first. Never alter SEO/llms.txt values. Never invent facts to fill copy.
