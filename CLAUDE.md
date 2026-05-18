# CLAUDE.md

This file is the operating system for Not On Mondays. It is structured in four layers: **Philosophy** (governs all decisions), **Standards** (non-negotiable implementation rules), **Task Guidance** (how to execute specific output types), and **Reference** (lookup tables). When layers appear to conflict, Philosophy governs Standards, and Standards govern Task Guidance.

---

## What this repo is

A static HTML website for **Not On Mondays** (notonmondays.com) — no build tools, no package manager, no framework. Every page is a plain `.html` file. Styles are split between a shared stylesheet and page-specific inline `<style>` blocks.

There are no commands to run. Editing files is the development workflow.

---

## File structure

```
assets/nom.css                              — shared stylesheet for all public pages
assets/logos/                               — logo image files for the logo strip
templates/article-template.html            — article starter with [REPLACE] markers

index.html                                  — homepage
work/index.html                             — curated proof index (/work/)
proof/<slug>/index.html                     — individual proof pages (/proof/<slug>/)
services/index.html                         — services landing page
services/<slug>/index.html                  — individual service pages

insights/index.html                         — insights landing page
insights/<slug>.html                        — canonical article pages (/insights/<slug>)
insights/legal-digital-change.html         — reference implementation (finished article)

how-we-work/index.html                      — standalone How We Work page
why-not-on-mondays.html                     — About page
privacy-policy.html                         — legal page
legal-digital-change.html                   — root copy (backwards compat; canonical → /insights/)
```

All asset paths use root-relative URLs (`/assets/nom.css`, `/assets/nomlogo400.png`) so they work from any subdirectory depth.

---
---

*Layer 1 — Philosophy: Strategic principles governing all decisions.*

---

## NOM Operating Philosophy

This section governs strategic and editorial decisions across all outputs. Apply it when making choices about UX, copy, service framing, information architecture, proof pages, insight articles, proposals, and operational content.

It is not brand language. It is a set of decision-making principles.

---

### Core operating belief

Most organisations do not primarily suffer from a lack of tools.

They suffer from:

- **Fragmentation** — work spread across disconnected systems and people
- **Unclear ownership** — no one is accountable for the right things
- **Operational drift** — processes that have evolved without intention
- **Invisible user friction** — points of confusion or failure that no one has mapped
- **Disconnected systems** — tools that do not talk to each other or to the people using them

NOM exists to reduce that friction and create clearer operating environments.

This belief should inform every output: UX decisions, service framing, article strategy, dashboard design, CRM thinking, platform choices, client communication, and governance structures. When in doubt about a design or copy choice, ask whether it reduces or increases fragmentation and cognitive load.

---

### What NOM actually sells

NOM does not lead with deliverables. The value delivered is:

- **Clarity** — operational, structural, informational
- **Trust** — between teams, with clients, in the product
- **Visibility** — into what is working, what is not, and why
- **Operational improvement** — sustainable, not heroic

Deliverables (a document, a website, a system, a plan) are evidence of this work. They are not the work itself. Frame services, proof pages, and proposals accordingly. A website is not a deliverable — it is how a business becomes legible to the people who need to understand it.

---

### Specialist positioning

NOM is a specialist in operational clarity, not a general digital agency. Generic agency behaviour — broad service lists, vague positioning, deliverable-first framing — undermines this.

Apply this principle when:

- writing service descriptions or capability pages
- framing proposals or engagement scopes
- writing insight articles (one specific problem, developed fully)
- deciding what to include or exclude from a proof page
- describing what NOM does in any context

Depth beats breadth. One well-framed problem is stronger than five loosely related capabilities. If copy could belong to any agency, it belongs to none.

---

### Cognitive load

Every output — page, article, proposal, interface, form, navigation structure — should reduce cognitive load, not add to it.

A user who feels confused is not ready to trust. Confusion produces exits. Clarity produces trust.

Apply this as a filter on:

- **Information architecture** — fewer options, clearer hierarchy
- **Copy** — cut until only the essential remains
- **Visual density** — whitespace is structural, not decorative
- **Form design** — ask only what is needed, in the right order
- **Navigation** — reflect how the buyer thinks, not how NOM is organised internally
- **Proof pages** — orient the reader before asking them to believe anything

---

### Buyer psychology

Buyers of operational and professional services are managing uncertainty and evaluating risk. They are not shopping. They are looking for evidence that this organisation understands their situation.

This shapes how all public-facing content should be structured:

- Orient the reader before asking anything of them
- Name the problem before proposing a solution
- Make it easy to understand what NOM does and for whom
- Lead with the situation the buyer already has, not with NOM's capabilities

A prospect who feels understood is more likely to enquire than one who has read a list of services. The site's job is not to impress — it is to make the right person feel recognised.

---

### Insight articles as trust infrastructure

Insight articles are not for traffic generation. They are structural evidence that NOM understands the operational problems it claims to solve.

When writing an insight article:

- Write from demonstrated understanding, not general observation
- Ground every claim in operational reality — avoid abstract theory
- Develop one idea well rather than covering five points loosely
- The reader should leave better informed, not merely impressed
- Do not editorialise; let the analysis carry the authority

See also: Article structure (mental model), in Task Guidance.

---

### Calm authority

NOM's voice should feel like a practitioner who has done the work, not a commentator or a salesperson.

In practice:

- Short, direct sentences
- No superlatives or urgency language
- Specific outcomes, not vague benefits
- No unsupported assertions
- No hedging that undercuts the point

See Writing behaviour in Task Guidance for the implementation rules. Apply the same standard to service copy, proof pages, proposal language, and UI text — not just articles.

---

### Orientation as a design principle

Interfaces and communications should leave the user feeling:

- **Oriented** — they know where they are and what the options are
- **Reassured** — the organisation clearly knows what it is doing
- **Understood** — the content speaks to their actual situation, not to a generic visitor

This applies to page layout, navigation structure, heading hierarchy, dashboard design, onboarding flows, and any interface where a user is making a judgement or a decision. Disorientation produces exits and erodes trust.

---

### Reusable operational systems

Prefer repeatable, reusable patterns over bespoke one-offs. Bespoke chaos is itself a form of fragmentation.

When designing delivery systems, content structures, CRM flows, or proof page architecture, build for reuse. The NOM site itself is an example: the article system, shared nav, and CSS design tokens exist to enforce consistency. Extend them. Do not bypass them.

This principle also applies to client work: a system that only one person understands is a single point of fragmentation.

---

### Evidence over assertion

Claims about capability should be demonstrated through operational proof, not stated as fact in service copy.

This shapes the relationship between the site's content layers: proof pages and insight articles carry the credibility that service descriptions cannot establish alone. Service copy points toward evidence; it does not replace it.

In practice:

- Describe what was actually done, not what NOM is capable of doing in the abstract
- Do not claim things in copy that are not backed somewhere else in the site
- When writing service pages, point toward proof pages and articles rather than asserting quality or expertise directly
- Generic capability statements ("we deliver results") are a signal to rewrite

---

### Language to avoid

These categories signal generic agency thinking, not specialist operational clarity:

| Category | Examples |
|---|---|
| Startup / hype | "seamless", "game-changing", "cutting-edge", "transformative", "innovative" |
| Thought leadership | "the future of", "unlocking potential", "driving change", "industry-leading" |
| Vague agency | "holistic", "end-to-end", "360-degree", "full-service", "omnichannel" |
| Consultant bloat | "leverage", "synergies", "move the needle", "strategic alignment", "key stakeholders" |

Prefer plain nouns and verbs. Specific outcomes over vague benefits. What something is over what it promises to become. If a sentence could appear in a generic agency brochure, rewrite it.

---
---

*Layer 2 — Standards: Non-negotiable implementation rules.*

---

## NOM design language

- **Colours**: `--blue` (#1a2ad4), `--dark` (#111124), `--off-white` (#f2f0e8), `--warm-white` (#faf8f2), `--light-blue` (#bfc6f0), `--mid` (#2a2a4a), `--muted` (#8a8fa8)
- **Type**: Cormorant Garamond (serif headlines, weight 300), DM Mono (labels, metadata, CTAs), DM Sans (body, weight 300)
- **Pattern**: mono eyebrow → serif headline → sans body. Thin rules for separation. Generous whitespace. No decoration for its own sake.
- **Heading hierarchy**: `h1` in hero only. `h2` for section headings and CTA headings. `h3` for sub-sections and card headings.
- **Tone**: calm, plain, spacious. For the full tone standard, see Operating Philosophy — Calm Authority and Language to avoid.

---

## Working rules

These rules govern all HTML and CSS work. Rules 1–8 are the authoritative guidance on CSS creation; they supersede any conflicting shorthand elsewhere in this document.

1. **Read first.** Before writing any CSS or HTML, read `assets/nom.css` and the relevant page. Do not invent styles that already exist.
2. **Reuse before creating.** If a class in the article system covers the need, use it. Do not create a page-specific version of something that already exists in shared CSS.
3. **Extend shared styles when genuinely needed.** If a new pattern is required that no existing class covers, add it to `assets/nom.css` in a new numbered section with the `article-` prefix. Do not create page-specific classes for patterns that belong in the shared system.
4. **No inline styles.** Inline `style=""` attributes are only acceptable for the footer logo (a decorative element with repeated raw values) and single-element layout tweaks with no class equivalent. Do not use them for typography, colour, or spacing that belongs in CSS.
5. **Do not break existing pages.** Any change to `assets/nom.css` affects every page that loads it. Verify that changes do not regress `index.html`, `insights/index.html`, or the article pages.
6. **Preserve mobile responsiveness.** The system is mobile-first. Breakpoints are 640px and 900px. Horizontal gutters live on `article-container` (not `article-section`). Do not re-introduce double-padding.
7. **Keep naming clean.** New shared classes use the `article-` prefix. Insights-section classes use the `insights-` prefix. Do not mix prefixes or use generic names like `.card` or `.hero`.
8. **Do not worsen known technical debt.** The bare `nav {}` selector in nom.css is intentionally broad. It is already reset in `.article-toc`, `.site-footer nav`, and overridden by `.site-nav` inline styles on each page. Do not add new bare element selectors. See Known technical debt in Reference.

---

## Navigation standard

The homepage (`index.html`) is the visual and structural source of truth for navigation. All public pages must use the same pattern.

### Standard nav structure

```html
<header class="site-header">
  <nav class="site-nav" aria-label="Main navigation">
    <a href="/" class="nav-logo" aria-label="Not On Mondays — return to homepage">
      <span class="nav-logo-initials" aria-hidden="true">
        <span class="nom-initial fade-1">n</span>
        <span class="nom-initial fade-2">o</span>
        <span class="nom-initial landing">m</span>
      </span>
      <span class="nav-logo-divider" aria-hidden="true"></span>
      <span class="nav-descriptor" aria-hidden="true">...</span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Open navigation menu">Menu</button>
    <ul class="nav-links" id="nav-menu" role="list">
      <li><a href="/why-not-on-mondays">About</a></li>
      <li><a href="/services/">Services</a></li>
      <li><a href="/how-we-work/">How We Work</a></li>
      <li><a href="/work/">Work</a></li>
      <li><a href="/insights/">Insights</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
    <a href="/#contact" class="nav-cta">Start a conversation</a>
  </nav>
</header>
```

### Nav rules

- **Always** include a skip link: `<a href="#main-content" class="skip-link">Skip to main content</a>`
- **Always** include mobile toggle JS (see any service page for the pattern)
- Logo letters use `font-size: 0.75rem` — do not reduce below this
- `nom.css` provides `.nav-logo .nom-initial { font-size: 0.75rem }` (specificity 0,2,0); a page-level `.nom-initial` rule alone (specificity 0,1,0) will be overridden
- Descriptor text uses `font-size: 0.55rem`; hide with `display:none` at ≤900px
- Use `aria-current="page"` on the active nav link
- "How We Work" links to `/how-we-work/` — never to `#how-we-work` or `/#how-we-work`
- "About" links to `/why-not-on-mondays` (no `.html` suffix)

---

## Footer standard

```html
<footer class="site-footer">
  <a href="/" aria-label="Not On Mondays — return to homepage" style="...logo stacked letters...">...</a>
  <nav aria-label="Footer navigation">
    <ul class="footer-links">
      <li><a href="/why-not-on-mondays">About</a></li>
      <li><a href="/services/">Services</a></li>
      <li><a href="/how-we-work/">How We Work</a></li>
      <li><a href="/work/">Work</a></li>
      <li><a href="/insights/">Insights</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
    <ul class="footer-links" style="margin-top:1rem;">
      <li><a href="/net-zero.html">Net Zero &amp; Environmental Policy</a></li>
      <li><a href="/privacy-policy.html" ...>Privacy Policy</a></li>
    </ul>
  </nav>
  <p class="footer-copy"><small>notonmondays.com · 2026</small></p>
</footer>
```

Footer logo letters: `font-size: 0.75rem` inline — match nav logo size.

---

## Accessibility standards

### WCAG requirements

- Every public page must have a skip link visible on focus
- One `<h1>` per page (in hero only)
- Heading hierarchy: h1 → h2 → h3, no skipping
- All form inputs must have associated `<label>` elements
- Decorative elements must carry `aria-hidden="true"`
- `aria-label` on all interactive elements that lack visible text
- Colour contrast: body text on off-white passes WCAG AA (dark #111124 on #f2f0e8 = 16:1)
- Muted text: `--muted` (#8a8fa8) on white falls below AA for small text — use sparingly, only for secondary or decorative content; never for primary reading text
- `role="status"` / `aria-live="polite"` on async feedback messages
- `aria-live="assertive"` only for error alerts
- `prefers-reduced-motion`: handled globally in nom.css — do not re-declare per page

### Accessible copy

- No em dashes in visible copy — use a colon, comma, or rewrite the sentence
- No `→` arrows in form submit buttons or email links — decorative arrows in marketing CTAs are acceptable
- Decorative separators (·) must have `aria-hidden="true"`

### Typography minimums

*Reference values — do not go below these in any context.*

| Element | Minimum size |
|---|---|
| Body copy | `font-size: 1rem`, `line-height: 1.85` |
| Navigation links | `font-size: 0.6rem` (DM Mono, uppercase) |
| Logo initials | `font-size: 0.75rem` |
| Metadata / mono labels | `font-size: 0.58rem`; prefer 0.62rem where space allows |
| Footer links | `font-size: 0.58rem` |

All interactive elements must have visible `:focus-visible` states. On dark backgrounds, use `outline-color: var(--light-blue)` for focus rings. Touch targets: minimum 44×44px effective touch area (use padding to achieve this).

---
---

*Layer 3 — Task Guidance: How to execute specific output types and workflows.*

---

## Articles

### Article creation

When asked to create an article, produce a complete, publish-ready insights article — not notes, not a draft, not a discussion.

**Always use the article system:**
- Start from `templates/article-template.html`
- Follow the structure used in `insights/legal-digital-change.html` (reference implementation)
- Use only `article-*` classes from `assets/nom.css`

**Convert rough input into structured thinking.** If the input is bullet points, messy notes, or partial ideas, organise it into a clear narrative, structure it into sections, remove repetition, and tighten the language before writing HTML.

**Output:** Return a complete HTML file only. No explanation, no commentary, no decisions narrated, no partial outputs.

**Checklist for every new article:**
1. Update `<title>`, `<meta name="description">`, `link[canonical]`, all `og:*` and `twitter:*` tags
2. Update JSON-LD structured data: `headline`, `url`, `mainEntityOfPage/@id`, `datePublished`, `dateModified`
3. Update `<h1>`, standfirst, eyebrow, back link, metadata strip, TOC anchors, and all body content
4. Page-specific `<style>` block: skip link, `.site-header`, `.site-nav`, `.nav-logo` and related nav classes, `.site-footer`, `.footer-links`, mobile nav breakpoint only — no article system classes
5. Do not re-declare `:focus-visible`, `prefers-reduced-motion`, or `.site-footer nav` — all three live in nom.css
6. Add the article to `insights/index.html` by copying the `<!-- INSIGHTS ITEM -->` block; newest article at the top
7. One `<h1>` per page (hero only); `<h2>` for sections and CTA; `<h3>` for sub-sections and card headings
8. Use `<time datetime="YYYY-MM-DD">` for publication dates

**When something is unclear:** Check an existing article first. Proceed using the closest matching pattern. Only ask a question if you cannot proceed without an answer.

---

### Article structure (mental model)

Internally structure every article as follows:

1. **Clear framing** — what this is about and why it matters
2. **What is actually going wrong** — grounded in operational reality, not abstract theory
3. **What works instead** — practical, usable thinking
4. **Implications** — what this means for teams or organisations
5. **Close** — calm, confident, no hard sell

---

### Short articles

If the request is for a short article, note, or thinking piece:

- Keep it concise (200–500 words)
- Focus on one idea only
- Reduce structural complexity
- Optional TL;DR; no TOC unless genuinely useful
- Maintain the same NOM tone and design language
- Use existing article structure and classes where possible
- Local visual experiments are acceptable if scoped inline to the page only

Short articles should feel editorial and deliberate, not like blog filler.

---

### Writing behaviour

These rules apply to all visible copy: articles, service pages, proof pages, UI labels, CTAs, and proposals.

- Use plain English
- Keep sentences short and clear
- Avoid buzzwords and hype
- Avoid over-explaining
- No dramatic tone
- No "thought leadership" language
- No unsupported assertions

Write like someone who has actually done the work.

For the strategic reasoning behind these rules, see Operating Philosophy — Calm Authority and Language to avoid. For accessible copy rules (em dashes, decorative arrows), see Accessibility standards.

---

### SEO and metadata

Claude must always:

- Generate a strong meta description (150–160 chars)
- Set canonical to `/insights/<slug>`
- Generate OG + Twitter tags
- Include JSON-LD Article schema with: `headline`, `description`, `image`, `author`, `publisher`, `datePublished`, `dateModified`, `mainEntityOfPage`, `url`
- Include 1–2 internal links to other insights articles using natural phrasing (not forced SEO anchor text)

---

## Proof pages

### What a proof page is

A proof page is operational evidence. It shows what the work actually looked like — the systems, rhythms, artefacts, and outcomes — rather than narrating it from a distance.

Proof pages live at `/proof/<slug>/`. They are linked from the `/work/` index page.

An article makes an argument. A proof page demonstrates that NOM has done the kind of work it claims to do. These are different functions, and they look different.

### Proof pages vs articles

| | Article (`/insights/`) | Proof page (`/proof/`) |
|---|---|---|
| Purpose | Makes an argument, develops an idea | Demonstrates operational capability |
| Structure | Narrative, sections, analysis | Operational signals, artefacts, outcomes |
| Voice | Editorial, observational | Factual, operational, precise |
| Audience | Anyone interested in the problem | Prospective clients evaluating fit |
| Listed in | Insights index | /work/ index |

### Creating a proof page

There is no shared article-template equivalent for proof pages. Use `/proof/azariah-operating-layer/index.html` as the reference implementation.

A proof page should contain:

1. **Engagement context** — who the client is, their situation, what NOM was engaged to do
2. **Operational signals** — specific, factual: team size, locations, functions covered, engagement type
3. **What the work looked like** — artefacts, systems, delivery rhythms, structures introduced; show, do not describe
4. **Outcomes** — specific and factual; not "improved efficiency" but "founder freed from coordination overhead; delivery visible across the whole team"
5. **CTA** — back to /work/ or to the contact section

Avoid:
- Narrative summaries that could describe any engagement
- Generic outcome language ("improved alignment", "better performance")
- Section structures that resemble blog articles
- Quoting without operational context around the quote

Proof pages use the NOM design language but are styled independently from the article system. Page-specific `<style>` blocks are acceptable for proof page layout.

---

## Service pages

### Service framing

Frame services by the situation that prompts the need, not by the deliverable produced.

A buyer reading "we produce delivery plans" is evaluating whether they want a delivery plan. A buyer reading "when delivery has stalled and progress feels inconsistent" is evaluating whether that is their situation. The second framing produces recognition; the first produces a procurement decision.

The mental model for any service description:

1. **Situation** — the operational reality that brings someone here
2. **What changes** — what is different after the work; described in operational terms
3. **How NOM helps** — the actual approach, kept brief; no methodology padding

### In practice

Service copy should:
- Open with the situation, not the service name
- Describe outcomes in operational terms (what the team can now do; what the founder no longer carries)
- Be specific enough that the wrong client self-selects out
- Avoid leading with methodology, process, or deliverable lists

Example — weak: "We provide fractional COO services for growing organisations."
Example — stronger: "For when you need an operator inside the work, not an advisor observing it."

When creating or editing a service page, check: does this copy describe the situation of the person who needs this service, or does it describe what NOM produces?

---
---

*Layer 4 — Reference: Lookup tables and technical notes.*

---

## Article system class reference

`assets/nom.css` contains a complete, self-contained article system. **Always read `assets/nom.css` before writing new styles** — do not invent classes that already exist.

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
| TL;DR | `article-tldr`, `article-tldr-label` |
| Expandable | `article-details`, `article-details-title`, `article-details-icon`, `article-details-content` |
| Images | `article-img`, `article-img-placeholder`, `article-img-caption` |
| CTA | `article-cta`, `article-cta-inner`, `article-cta-label`, `article-cta-heading`, `article-cta-body`, `article-cta-link`, `article-cta-link--ghost` |

The Insights landing page uses a separate `insights-` prefix for its own layout classes, defined inline in `insights/index.html`.

---

## URL conventions

- Article canonical URL lives at `/insights/<slug>` — that is the authoritative path
- The root-level copy (`/legal-digital-change.html`) exists for backwards compatibility; its `canonical`, `og:url`, and `twitter:url` all point to the `/insights/` version
- New articles should be created only at `/insights/<slug>.html` — no root-level copy needed
- Proof pages live at `/proof/<slug>/index.html` with canonical at `/proof/<slug>/`
- New proof pages are listed in `work/index.html` — not in the insights index

---

## Known technical debt

| Item | Risk | Status |
|---|---|---|
| Bare `nav {}` selector in nom.css | Any new `<nav>` without a position reset silently becomes fixed | Managed with explicit resets — do not add new `<nav>` elements without checking |
| Nav chrome duplicated per page | Each page re-declares `.site-nav`, `.nav-logo`, etc. | Intentional for a static site with no templating system |
| `insights-` classes in page inline style | Not in shared CSS | Only used on the Insights index — acceptable until a second index-style page is needed |
