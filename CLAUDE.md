# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What this repo is

A static HTML website for **Not On Mondays** (notonmondays.com) — no build tools, no package manager, no framework. Every page is a plain `.html` file. Styles are split between a shared stylesheet and page-specific inline `<style>` blocks.

There are no commands to run. Editing files is the development workflow.

---

## File structure that matters

```
assets/nom.css                        — shared stylesheet for all public pages
index.html                            — homepage (has its own inline CSS, not article system)
insights/index.html                   — Insights landing page
insights/legal-digital-change.html   — canonical article (reference implementation)
legal-digital-change.html            — root copy, canonical points to /insights/ version
```

All asset paths use root-relative URLs (`/assets/nom.css`, `/assets/nomlogo400.png`) so they work from any subdirectory depth.

---

## The shared article system

`assets/nom.css` contains two things:

1. **Base styles** — reset, CSS custom properties, the bare `nav {}` rule (known technical debt — see below), `.nav-cta`, global `:focus-visible`, `.site-footer nav` reset, reduced-motion rule.

2. **Article system** (sections 1–16, from line ~83 onward) — a complete, self-contained set of reusable classes for editorial pages. All classes use the `article-` prefix.

**Always read `assets/nom.css` before writing any new styles.** The system covers:

| Section | Classes |
|---|---|
| Layout | `article-layout`, `article-container`, `article-section`, `article-section--light/warm/dark` |
| Hero | `article-hero`, `article-hero-inner`, `article-hero-eyebrow`, `article-hero-headline`, `article-hero-standfirst`, `article-back-link` |
| Metadata | `article-meta`, `article-meta--dark/light`, `article-meta-tag`, `article-meta-sep` |
| TOC | `article-toc`, `article-toc-label`, `article-toc-list` |
| Body | `article-body`, `article-lede`, `article-section-heading`, `article-subsection-heading` |
| Lists | `article-list`, `article-list--ordered` |
| Blockquotes | `article-blockquote` |
| Callouts | `article-callout`, `article-callout-label` |
| Card strip | `article-cards`, `article-card`, `article-card-label`, `article-card-heading`, `article-card-body` |
| Stat cards | `article-stat-cards`, `article-stat-card`, `article-stat-card-label`, `article-stat-card-number`, `article-stat-card-subtext`, `article-stat-card-source`, `article-stat-card-rule`, `article-stat-card-heading`, `article-stat-card-body` |
| Expandable | `article-details`, `article-details-title`, `article-details-icon`, `article-details-content` |
| Images | `article-img`, `article-img-placeholder`, `article-img-caption` |
| CTA | `article-cta`, `article-cta-inner`, `article-cta-label`, `article-cta-heading`, `article-cta-body`, `article-cta-link`, `article-cta-link--ghost` |

The Insights landing page uses a separate `insights-` prefix for its own layout classes, defined inline in `insights/index.html`.

---

## NOM design language

- **Tone**: calm, credible, spacious, plain English. Not a blog, not a magazine.
- **Colours**: `--blue` (#1a2ad4), `--dark` (#111124), `--off-white` (#f2f0e8), `--warm-white` (#faf8f2), `--light-blue` (#bfc6f0), `--mid` (#2a2a4a), `--muted` (#8a8fa8)
- **Type**: Cormorant Garamond (serif headlines, weight 300), DM Mono (labels, metadata, CTAs), DM Sans (body, weight 300)
- **Pattern**: mono eyebrow → serif headline → sans body. Thin rules for separation. Generous whitespace. No decoration for its own sake.
- **Hierarchy**: h1 in hero only, h2 for article sections and CTA heading, h3 for sub-sections and card headings.

---

## Working rules

1. **Read first.** Before writing any CSS or HTML, read `assets/nom.css` and the relevant article page. Do not invent styles that already exist.
2. **Reuse before creating.** If a class in the article system covers the need, use it. Do not create a page-specific version of something that already exists in shared CSS.
3. **Extend shared styles carefully.** If a genuinely new pattern is needed, add it to `assets/nom.css` in a new numbered section with the `article-` prefix. Do not add it inline on one page only.
4. **No inline styles.** Inline `style=""` attributes are only acceptable for the footer logo (which uses repeated raw values for a small decorative element) and quick layout tweaks on individual elements with no class equivalent. Do not use them for typography, colour, or spacing that belongs in CSS.
5. **Do not break existing pages.** Any change to `assets/nom.css` affects every page that loads it. Test that the changed property does not create regressions in `index.html`, `insights/index.html`, and the article pages.
6. **Preserve mobile responsiveness.** The system is mobile-first. Breakpoints are 640px and 900px. Horizontal gutters live on `article-container` (not `article-section`). Do not re-introduce double-padding.
7. **Keep naming clean.** New article-system classes use `article-` prefix. Insights-section classes use `insights-` prefix. Do not mix prefixes or use generic names like `.card` or `.hero`.
8. **Preserve the known technical debt, do not make it worse.** The bare `nav {}` selector in nom.css is intentionally broad (known issue). It is already reset in `.article-toc`, `.site-footer nav`, and overridden by `.site-nav` inline styles on each page. Do not add new bare element selectors.

---

## When creating a new article page

1. Copy `insights/legal-digital-change.html` as the starting point — it is the reference implementation.
2. Update in the copy: `<title>`, `<meta name="description">`, `link[canonical]`, all `og:*` and `twitter:*` tags, JSON-LD structured data (`headline`, `url`, `mainEntityOfPage/@id`, `datePublished`, `dateModified`), the `<h1>`, standfirst, eyebrow, back link, metadata strip, TOC anchors, and all article body content.
3. The page-specific `<style>` block should contain **only**: skip link, `.site-header`, `.site-nav`, `.nav-logo` and related nav classes, `.site-footer` and `.footer-links`, and mobile nav breakpoint. Do not put article system classes there.
4. Do not re-declare `:focus-visible`, `prefers-reduced-motion`, or `.site-footer nav` — all three live in `nom.css`.
5. Add the article to `insights/index.html` by copying the `<!-- INSIGHTS ITEM -->` block, updating the `href`, `datetime`, `id`, tags, headline, standfirst, and read time. Newest article at the top.
6. Check heading hierarchy: one `<h1>` per page (in the hero), `<h2>` for section headings and the CTA, `<h3>` for sub-sections and card headings.
7. Use `<time datetime="YYYY-MM-DD">` for publication dates, not plain `<span>`.
8. Use `aria-hidden="true"` on decorative separators (`·`) and eyebrow labels. Use `aria-label` on groups and interactive elements that need explicit names.

---

## URL and SEO rules

- Article canonical URL lives at `/insights/<slug>` — that is the authoritative path.
- The root-level copy (`/legal-digital-change.html`) exists for backwards compatibility; its `canonical`, `og:url`, and `twitter:url` all point to the `/insights/` version.
- New articles should be created only at `/insights/<slug>.html` — no root-level copy needed.
- Structured data must include: `headline`, `description`, `image`, `author`, `publisher`, `datePublished`, `dateModified`, `mainEntityOfPage`, `url`.

---

## Known technical debt

| Item | Risk | Status |
|---|---|---|
| Bare `nav {}` selector in nom.css | Any new `<nav>` without a position reset silently becomes fixed | Managed with explicit resets — do not add new `<nav>` elements without checking |
| Nav chrome duplicated per page | Each page re-declares `.site-nav`, `.nav-logo`, etc. | Intentional for a static site — no templating system |
| `insights-` classes in page inline style | Not in shared CSS | Only used on the Insights index — acceptable until a second index-style page is needed |
