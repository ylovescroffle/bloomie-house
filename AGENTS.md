# AGENTS.md

## Cursor Cloud specific instructions

### What this is
Single Cloudflare Workers app (the Bloomie House marketing website). All app logic —
routing, page HTML, and the `POST /api/chat` endpoint — lives in `src/index.js`.
There is no database, no build step, and no test/lint tooling configured. Config is in
`package.json` and `wrangler.toml`.

### Running / building / testing
Standard commands are defined in `package.json`:
- Run dev server: `npm run dev` (`wrangler dev`) — serves on `http://localhost:8787`.
- Deploy: `npm run deploy` (`wrangler deploy`) — requires a real Cloudflare account; not needed for local dev.
- Build: none (Wrangler/Miniflare bundles the Worker on the fly).
- Tests / lint: none configured.

`npm run dev` runs fully locally via Miniflare; no Cloudflare login is required. Wrangler
prints an out-of-date warning (v3 vs v4) — this is harmless and does not affect local dev.

### AI chat (`/api/chat`) — Groq
The floating "Bloomie" chat widget posts to the server-side `POST /api/chat` route, which
proxies to the Groq API. This requires a `GROQ_API_KEY`. Without it, the endpoint returns
HTTP 503 `{"error":"The assistant is not configured yet."}` and the widget shows that
message — this is graceful, expected behavior, not a bug. Everything else on the site works
without the key. To enable real AI replies locally, create a gitignored `.dev.vars` file in
the repo root containing `GROQ_API_KEY=your_key_here`, then restart `npm run dev`
(`.dev.vars` is only read at startup). Optionally override the model with `GROQ_MODEL` in
`wrangler.toml` (defaults to `llama-3.3-70b-versatile`).
