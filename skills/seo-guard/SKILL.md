---
name: seo-guard
description: >
  Audit a site for SEO + AI-search visibility and apply only safe, high-quality fixes — keeping
  llms.txt, meta, hreflang, sitemaps, and structured data consistent. Self-improving: reads run
  history, logs after. Use when the user says "SEO pass", "check SEO", "don't break SEO",
  "update llms.txt", or ships site copy/structure changes. Agentic OS (Level 1).
---

# seo-guard

Safe SEO + AI-visibility guardrail. Audits, then fixes only what's low-risk.

## Loop (every time)
1. **Before** — read `<vault>/agentic-os/runs/seo-guard.md`; apply `lesson:`.
   Standing lessons:
   - Never change a live URL/slug without a 301 — broken canonicals tank rankings.
   - Keep `llms.txt` in sync with sitemap + nav after any page add/rename.
   - Multilingual: every page needs correct `hreflang` + self-referencing canonical per locale.

## Audit checklist (report first, fix second)
- `<title>` (≤60ch) + meta description (≤155ch) present, unique, per locale.
- One `<h1>`; logical heading order.
- Canonical + `hreflang` correct for every locale.
- `sitemap.xml` + `robots.txt` + `llms.txt` present, current, mutually consistent.
- JSON-LD structured data valid (Org/Article/Breadcrumb as fits).
- OG/Twitter cards, alt text on images, no broken internal links.

## Fix policy
- **Auto-fix (safe):** missing/duplicate meta, alt text, llms.txt drift, sitemap staleness, OG tags.
- **Propose only (risky):** URL/slug changes, redirects, canonical retargeting, content rewrites → list, don't apply.

## After
Append run: site, issues found/fixed/proposed, PASS/FAIL, `lesson:`.

## Output
Two tables: **Fixed** and **Needs your OK**. Never silently change URLs or redirects.
