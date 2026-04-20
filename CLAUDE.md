# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

Static HTML site for notonmondays.com (a fractional COO / operating partner consultancy). There is **no build step, no package manager, no test suite, and no framework** — every page is hand-authored HTML with inline `<style>` and `<script>` blocks. Hosting assumes paths are served directly (e.g. `assets/nom.css`, `/p/...`, `/hub/...`).

To preview locally, open the `.html` file in a browser, or serve the repo root with any static server (e.g. `python3 -m http.server`). Canonical URLs in `<head>` point at `https://www.notonmondays.com/`, so local previews will look slightly different for social/SEO metadata.

## Site structure (what's public vs. private)

- **Public marketing pages** (indexed, listed in `sitemap.xml`): `index.html`, `why-not-on-mondays.html`, `net-zero.html`, `privacy-policy.html`, `azariah-case-study.html`, `legal-tech-operations.html`.
- **`index-new.html`** is a working draft / staging copy of the homepage. Do **not** link to it from other pages; it exists for comparison against `index.html`. When updating the homepage, confirm with the user which of the two to change.
- **`/hub/<client>/`** (e.g. `hub/azariah/`) — private client hubs. These typically have a JS passphrase "gate" at the top of the page and are not linked from public nav or sitemap.
- **`/p/<slug>/` and `/p/<slug>.html`** — prospect- or project-specific one-pagers (proposals, reviews, snapshots). Not linked publicly.
- **`/kwc/`, `/not-on-mondays-design-system/`** — additional private/internal portals.
- **`/assets/`** — shared images, the OG image, favicon, and `nom.css`. `gds.new` is a reference/scratch file, not served.

When adding a new page, decide first whether it is public (must be added to `sitemap.xml`, needs full SEO/OG/schema.org head block like `index.html`) or private (no sitemap entry, minimal `<head>`, often behind a gate).

## Styling conventions

- `assets/nom.css` contains **only** the shared base: reset, CSS custom properties (the `--blue`, `--off-white`, `--dark` etc. palette), body typography, and the fixed `nav` + `.nav-cta` styles. It is linked from the secondary public pages (`why-not-on-mondays.html`, `net-zero.html`, `privacy-policy.html`, `azariah-case-study.html`).
- `index.html` and `legal-tech-operations.html` **do not** link `nom.css`; they re-declare the same tokens and base styles inline. When changing tokens (colours, nav height, fonts), update both `assets/nom.css` and any page that inlines its own copy — otherwise the public pages will drift.
- All page-specific CSS lives in an inline `<style>` block at the top of each file. Keep it that way; don't add new external stylesheets.
- Fonts are loaded from Google Fonts (DM Sans, DM Mono, Cormorant Garamond). Preserve the `preconnect` links when editing `<head>`.
- Private hub pages (`hub/azariah/*`, `kwc/*`, design system portal) use their **own** palette and tokens (e.g. NHS-style blues in `hub/azariah/`). Don't cross-pollinate tokens from the public brand into these.

## Contact form

All public contact forms POST to Web3Forms (`https://api.web3forms.com/submit`) with the access key `928cf674-3677-401c-84d8-bca11e8eb83e` embedded as a hidden input. If you add a new contact form, copy the pattern from `index.html` (hidden `access_key`, `subject`, `from_name`, honeypot `botcheck`, plus the inline `fetch` submit handler) rather than inventing a new one. The key is intentionally committed — it is a public form-relay key, not a secret.

## SEO / metadata expectations for public pages

The homepage head is the reference implementation: canonical URL, `og:*`, `twitter:*`, `application/ld+json` structured data (`ProfessionalService` on the homepage, page-appropriate types elsewhere), and a keywords meta that mirrors the schema `knowsAbout`. New public pages should follow the same shape. Also add the page to `sitemap.xml`.

## Commits and branches

- The live/production branch is `dev` (this is what has historically been merged and deployed). `main` is not used.
- Commit messages in history use a loose prefix style (`refactor:`, `chore:`, `ux:`, `copy:`, `fix:`) or plain sentence case. Match the surrounding style rather than imposing a new convention.
- Active feature work for this session lives on `claude/init-project-fpX07`.
