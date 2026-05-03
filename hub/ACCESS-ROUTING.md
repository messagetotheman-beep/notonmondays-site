# Hub Access Routing

## What it does

`/functions/hub/index.js` is a Cloudflare Pages Function that handles all requests to `/hub/`.

When a user hits `/hub/`, Cloudflare Access has already authenticated them. The function reads their email from the `cf-access-authenticated-user-email` header and routes them based on how many workspaces they have assigned.

## How email detection works

The function uses a three-step fallback chain. It tries each source in order and stops at the first one that yields a value.

### 1. `cf-access-authenticated-user-email` (primary)

The standard header set by Cloudflare Access after authentication. Most reliable. Always checked first.

### 2. `cf-access-jwt-assertion` (fallback)

If the primary header is absent, the function reads the Cloudflare Access JWT from this header, base64url-decodes the payload, and extracts the `email` field. Falls back to `sub` only if it contains an `@` sign (the `sub` field in standard Access tokens is a UUID, not an email).

This covers configurations where Cloudflare Access sets the JWT but not the convenience email header.

### 3. `x-dev-user-email` (local development only)

Used with `wrangler pages dev` where CF Access headers are unavailable. Always checked last — it cannot override a real Access session. In production, Cloudflare strips arbitrary inbound headers before they reach a Pages Function, so this header cannot be spoofed live.

The normalised email (lowercase, trimmed) is what gets matched against the workspace map.

## Routing behaviour

| Condition | Response |
|---|---|
| No `cf-access-authenticated-user-email` header | 403 — "We could not confirm your workspace access." |
| Email authenticated but not in the map | 403 — "No workspace has been assigned to this email yet." |
| Email maps to exactly one workspace | 302 redirect to that workspace |
| Email maps to more than one workspace | 200 — branded workspace picker showing only their assigned workspaces |

### Single-workspace redirect

If the authenticated email has one workspace entry, the user is redirected immediately with no extra click:

```js
return Response.redirect(new URL(workspaces[0].url, request.url), 302);
```

### Multi-workspace picker

If the authenticated email has more than one workspace, the function renders a server-side picker page. Only the workspaces assigned to that email are rendered in the HTML. The full email map is never sent to the client.

## How to add a new client route

1. Open `functions/hub/index.js`.
2. Add an entry to the `workspaceAccess` object:

```js
"clientemail@example.com": [
  {
    name: "Client Name",
    description: "Short description shown in the picker",
    url: "/hub/clientname/",
  },
],
```

3. Create the workspace files at that path (e.g. `hub/clientname/index.html`).
4. Add a Cloudflare Access policy protecting `/hub/clientname/*` for that client's email(s).
5. Deploy.

Email keys must be lowercase. The function normalises the authenticated email before matching.

## Cloudflare Access setup required

Configure the following in the Cloudflare Zero Trust dashboard (Access > Applications):

| Path | Allowed users | Notes |
|---|---|---|
| `/hub/` | All hub users | Entry route — triggers authentication and runs the routing function |
| `/hub/azariah/*` | Azariah team emails | Prevents direct URL access by other clients |
| `/hub/latchmere/*` | Latchmere team emails | Add when workspace is live |
| `/hub/nom/*` | NOM owner / admin | Internal NOM workspace |

**Important:** The routing function is a navigation convenience, not a security boundary. Without path-level Access policies on each workspace, an authenticated user could navigate directly to another client's URL. Every `/hub/<client>/*` path needs its own policy.

## Testing

Cloudflare Access headers cannot be injected locally. To test:

1. Deploy the branch to a Cloudflare Pages preview environment.
2. Ensure the preview URL is protected by a Cloudflare Access application.
3. Sign in with a mapped single-workspace email — confirm automatic redirect.
4. Sign in with the NOM admin email (once configured) — confirm the workspace picker appears.
5. Sign in with an unmapped email — confirm the "No workspace assigned" fallback.
6. Hit `/hub/` without Access (e.g. bypass attempt) — confirm the "could not confirm" fallback.
7. Navigate directly to `/hub/azariah/` while authenticated as an Azariah user — confirm the workspace loads.

Local Wrangler (`wrangler pages dev`) can run the function but cannot inject the `cf-access-authenticated-user-email` header without a tunnel or manual header override in your test client.

## Workspace status

| Path | Status | Notes |
|---|---|---|
| `/hub/azariah/workspace.html` | Live | Full Azariah team workspace — no auth logic |
| `/hub/azariah/index.html` | Redirect | Meta-redirects to `workspace.html` — no auth logic |
| `/hub/nom/workspace.html` | Placeholder | NOM Internal workspace being prepared |
| `/hub/latchmere/workspace.html` | Live | Latchmere workspace with links to demo and assets |
| `/hub/latchmere/demo/` | Live | Latchmere site prototype (homepage) |
| `/hub/latchmere/demo/dashboard.html` | Live | Latchmere client dashboard |
| `/hub/latchmere/demo/assets/*` | Live | Wireframes, design system, accessibility, content |
| `/hub/nom/workspace.html` | Placeholder | NOM Internal workspace being prepared |

Cloudflare Access still needs a path-level policy for each workspace path (`/hub/azariah/*`, `/hub/nom/*`, `/hub/latchmere/*`) to prevent direct URL access by users not assigned to that client.

Original demo files remain at `/demos/latchmere-associates/` and are unprotected. The hub copies under `/hub/latchmere/` are the authoritative protected versions.

## Static fallback

`/hub/index.html` is a static fallback page. It displays "Your workspace will open after sign-in." and includes a manual link to the Azariah workspace. It contains no security logic. Cloudflare Access controls all route-level authorization.
