/**
 * Cloudflare Pages Function: /hub/
 *
 * Security model:
 *   - Cloudflare Access authenticates the user BEFORE this function runs.
 *     The cf-access-authenticated-user-email header is injected by Cloudflare
 *     and cannot be spoofed by external clients.
 *   - This function only routes already-authenticated users. It does not
 *     perform authentication itself.
 *   - Access to each client workspace (/hub/azariah/*, /hub/nom/*, etc.)
 *     must still be enforced by Cloudflare Access path-based applications
 *     or policies. This function is a navigation convenience, not a
 *     security boundary.
 */

export async function onRequest({ request }) {
  // ── Email detection — three-step fallback chain ──────────────────────────
  //
  // 1. cf-access-authenticated-user-email  — standard header set by Cloudflare
  //    Access after authentication. Most reliable source.
  //
  // 2. cf-access-jwt-assertion             — if the above is absent, try
  //    decoding the Access JWT directly and extracting the email field.
  //    Cloudflare Access sets this on every authenticated request.
  //
  // 3. x-dev-user-email                    — local development only.
  //    Used with `wrangler pages dev` where CF Access headers are unavailable.
  //    Cloudflare strips arbitrary request headers before they reach a
  //    Pages Function in production, so this cannot be spoofed live.
  //    Always checked last so it cannot override a real Access session.
  //
  // ─────────────────────────────────────────────────────────────────────────

  let rawEmail = request.headers.get("cf-access-authenticated-user-email");
  // DEBUG: log which source produced the email (visible in Cloudflare Pages logs, not in HTML)
  let emailSource = "cf-access-authenticated-user-email";

  if (!rawEmail) {
    const jwt = request.headers.get("cf-access-jwt-assertion");
    if (jwt) {
      rawEmail = decodeJwtEmail(jwt);
      emailSource = rawEmail ? "cf-access-jwt-assertion (decoded)" : "cf-access-jwt-assertion (decode failed)";
    }
  }

  if (!rawEmail) {
    rawEmail = request.headers.get("x-dev-user-email");
    emailSource = rawEmail ? "x-dev-user-email (local dev)" : "none";
  }

  // DEBUG: uncomment the line below temporarily in Pages logs to verify which
  // header supplied the email. Never log rawEmail itself to avoid leaking it.
  // console.log("[hub/routing] email source:", emailSource);

  const normalizedEmail = rawEmail?.toLowerCase().trim() || null;

  // ── Workspace access map ─────────────────────────────────────────────────
  //
  // Keys: authenticated email addresses (lowercase).
  // Values: array of workspace objects the user can access.
  //
  // Single entry  → user is redirected automatically.
  // Multiple entries → user sees a branded workspace picker.
  //
  // To add a new client:
  //   1. Add their email key and workspace object(s) here.
  //   2. Create the workspace files at the listed url path.
  //   3. Add a Cloudflare Access policy protecting that path.
  //
  // ─────────────────────────────────────────────────────────────────────────
  const workspaceAccess = {
    "jokmariano@theazariah.com": [
      {
        name: "Azariah",
        description: "Healthcare workforce compliance workspace",
        url: "/hub/azariah/workspace.html",
      },
    ],

    // NOM admin — sees the workspace picker with all active client workspaces.
    "david@notonmondays.com": [
      {
        name: "NOM Internal",
        description: "Internal operating dashboard",
        url: "/hub/nom/workspace.html",
      },
      {
        name: "Azariah",
        description: "Healthcare workforce compliance workspace",
        url: "/hub/azariah/workspace.html",
      },
      {
        name: "Latchmere",
        description: "Legal services demo workspace",
        url: "/hub/latchmere/workspace.html",
      },
    ],
  };

  // ── No authenticated email ───────────────────────────────────────────────
  // Cloudflare Access should prevent this, but handle it defensively.
  if (!normalizedEmail) {
    return fallbackResponse(
      "Access not confirmed",
      "We could not confirm your workspace access.",
      "If you believe this is an error, contact your Not On Mondays project lead."
    );
  }

  const workspaces = workspaceAccess[normalizedEmail];

  // ── Email authenticated but no workspace assigned ────────────────────────
  if (!workspaces || workspaces.length === 0) {
    return fallbackResponse(
      "No workspace assigned",
      "No workspace has been assigned to this email yet.",
      "Contact your Not On Mondays project lead to request access."
    );
  }

  // ── Single workspace → redirect automatically ────────────────────────────
  if (workspaces.length === 1) {
    return Response.redirect(new URL(workspaces[0].url, request.url).toString(), 302);
  }

  // ── Multiple workspaces → render branded picker ──────────────────────────
  return new Response(pickerPage(workspaces), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

/**
 * Branded fallback page for error/access states.
 * Rendered server-side — the email map is never sent to the client.
 */
function fallbackResponse(title, heading, detail) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)} — Not On Mondays Hub</title>
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300&display=swap" rel="stylesheet">
${sharedStyles()}
</head>
<body>
<div class="accent-bar" aria-hidden="true"></div>
<div class="bg-light" aria-hidden="true"></div>
<div class="bg-grid" aria-hidden="true"></div>
<main class="centred">
  <div class="card">
    <p class="wordmark"><strong>NOM</strong> &middot; Hub</p>
    <h1>${escapeHtml(heading)}</h1>
    <div class="rule" aria-hidden="true"></div>
    <p class="detail">${escapeHtml(detail)}</p>
  </div>
</main>
</body>
</html>`;

  return new Response(html, {
    status: 403,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

/**
 * Branded workspace picker page for users with multiple workspaces.
 * Rendered server-side — only the workspaces assigned to this user are included.
 * The email map is never exposed in the rendered HTML.
 */
function pickerPage(workspaces) {
  const cards = workspaces
    .map(
      (ws) => `
    <a class="ws-card" href="${escapeHtml(ws.url)}">
      <span class="ws-name">${escapeHtml(ws.name)}</span>
      <span class="ws-desc">${escapeHtml(ws.description)}</span>
      <span class="ws-arrow" aria-hidden="true">→</span>
    </a>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Select workspace — Not On Mondays Hub</title>
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300&display=swap" rel="stylesheet">
${sharedStyles()}
<style>
.picker { max-width: 560px; width: 100%; padding: 80px 40px; }
.picker-eyebrow {
  font-family: 'DM Mono', monospace;
  font-weight: 400;
  font-size: 9px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: #1a2ad4;
  margin-bottom: 16px;
}
.picker h1 {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(28px, 4vw, 42px);
  color: #f2f0e8;
  margin-bottom: 8px;
  line-height: 1.05;
}
.picker-sub {
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 14px;
  color: rgba(242,240,232,0.5);
  margin-bottom: 48px;
}
.ws-list { display: flex; flex-direction: column; gap: 12px; }
.ws-card {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  column-gap: 20px;
  padding: 22px 28px;
  background: rgba(242,240,232,0.03);
  border: 1px solid rgba(242,240,232,0.08);
  text-decoration: none;
  transition: border-color 0.18s, background 0.18s;
}
.ws-card:hover {
  background: rgba(242,240,232,0.05);
  border-color: rgba(26,42,212,0.45);
}
.ws-name {
  grid-column: 1;
  grid-row: 1;
  font-family: 'DM Mono', monospace;
  font-weight: 400;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: rgba(242,240,232,0.9);
  margin-bottom: 4px;
}
.ws-desc {
  grid-column: 1;
  grid-row: 2;
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 13px;
  color: rgba(242,240,232,0.42);
  line-height: 1.4;
}
.ws-arrow {
  grid-column: 2;
  grid-row: 1 / 3;
  align-self: center;
  font-family: 'DM Mono', monospace;
  font-size: 16px;
  color: rgba(26,42,212,0.6);
  transition: transform 0.18s;
}
.ws-card:hover .ws-arrow { transform: translateX(4px); color: #1a2ad4; }
@media (prefers-reduced-motion: reduce) {
  .ws-card, .ws-arrow { transition: none; }
}
.picker-note {
  margin-top: 36px;
  font-family: 'DM Mono', monospace;
  font-weight: 300;
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(242,240,232,0.18);
}
</style>
</head>
<body>
<!-- Cloudflare Access controls route-level authorization. This page only improves navigation. -->
<div class="accent-bar" aria-hidden="true"></div>
<div class="bg-light" aria-hidden="true"></div>
<div class="bg-grid" aria-hidden="true"></div>
<main class="centred">
  <div class="picker">
    <p class="wordmark" style="margin-bottom:48px"><strong>NOM</strong> &middot; Hub</p>
    <p class="picker-eyebrow" aria-hidden="true">Workspace selection</p>
    <h1>Select your workspace</h1>
    <p class="picker-sub">You have access to more than one workspace. Choose where to go.</p>
    <nav class="ws-list" aria-label="Your workspaces">
${cards}
    </nav>
    <p class="picker-note">Access to each workspace is controlled by Cloudflare Access.</p>
  </div>
</main>
</body>
</html>`;
}

/** Shared inline styles used by both the fallback and picker pages. */
function sharedStyles() {
  return `<style>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #111124;
  color: #f2f0e8;
  font-family: 'DM Mono', monospace;
  font-weight: 300;
  min-height: 100vh;
}
.accent-bar {
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: #1a2ad4;
  z-index: 10;
}
.bg-light {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 900px 700px at 80% 20%, rgba(26,42,212,0.05) 0%, transparent 70%),
    radial-gradient(ellipse 600px 500px at 0% 80%, rgba(26,42,212,0.04) 0%, transparent 60%);
}
.bg-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    linear-gradient(rgba(242,240,232,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(242,240,232,0.018) 1px, transparent 1px);
  background-size: 72px 72px;
}
.centred {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}
.card {
  max-width: 480px;
  width: 100%;
  text-align: center;
}
.wordmark {
  font-family: 'DM Mono', monospace;
  font-weight: 300;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(242,240,232,0.35);
  margin-bottom: 48px;
}
.wordmark strong { color: #1a2ad4; font-weight: 400; }
.card h1 {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 300;
  font-size: clamp(28px, 4vw, 40px);
  line-height: 1.1;
  color: #f2f0e8;
  margin-bottom: 20px;
}
.rule {
  width: 40px;
  height: 1px;
  background: rgba(26,42,212,0.5);
  margin: 28px auto;
}
.detail {
  font-family: 'DM Sans', sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.7;
  color: rgba(242,240,232,0.48);
}
</style>`;
}

/**
 * Attempts to extract an email address from a Cloudflare Access JWT.
 * Decodes the payload (second segment) using base64url and reads the
 * `email` field, falling back to `sub` if absent.
 * Returns null on any parse failure — never throws.
 */
function decodeJwtEmail(jwt) {
  try {
    const parts = jwt.split(".");
    if (parts.length !== 3) return null;

    // base64url → base64 → JSON
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    // `email` is the canonical Access JWT field.
    // `sub` is a UUID in standard Access tokens, not an email — only use it
    // if it looks like an email address (contains @).
    const candidate = payload.email || payload.sub || null;
    if (!candidate) return null;
    return String(candidate).includes("@") ? candidate : null;
  } catch {
    return null;
  }
}

/** Minimal HTML escaping for server-rendered strings. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
