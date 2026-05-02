# CLAUDE.md

Personal portfolio + games site. Static site, deployed to
**Cloudflare Pages** from this repo's `master` branch.

(Migrated off Heroku 2026-05. Pre-migration: Express + Jade. See
git log for the cutover commit.)

## Layout

- `apps/<app-name>/` — One subfolder per app. Each may contain:
  - `index.html` — Lodash template (`<%= var %>` syntax). Source
    of truth for the rendered HTML; legacy `<% var cacheBuster ... %>`
    declarations and `.v1.0.5` cache-buster substrings are stripped at
    build time and superseded by content-hashed filenames.
  - `templates/<name>.jade` — Pug-compatible templates (used only
    by `wedding/` and `page-missing/`). The build compiles these
    with the `pug` package (drop-in for Jade).
  - `public/` — Static assets shipped at `/<app-name>/...`.
  - `routes.js` — Pre-migration Express routing. **Vestigial.** Kept
    for reference only; see `functions/` for the live equivalents.
- `static/` — Cloudflare Pages config files copied verbatim into
  `dist/`:
  - `_headers` — Cache-Control, COOP/COEP, etc.
  - `_redirects` — Plain redirects expressible in Cloudflare's
    glob syntax. Complex regex redirects live in `functions/`.
- `functions/` — Cloudflare Pages Functions:
  - `[[catchall]].js` — ~50 short-URL aliases ported from
    `apps/redirects/routes.js`.
  - `inner-tube-climber/[[path]].js` — User-Agent-based redirect
    to Play Store (Android) / App Store (iOS) / itch.io
    (everything else).
- `build.js` — The build pipeline. Run via `npm run build`.

## Deployed apps

- chess, dancing-spokes, dynamics, hex-grid (homepage),
  kittenbaticorn, metabounce, page-missing (404), progress-circle,
  space-debris, squared-away, text-animation, wedding.

**Excluded from deploy** (still in repo for history):

- `apps/aldenwitt.com/` — Vestigial.
- `apps/fat-cat-chat/` — Was a Heroku redirect; replaced by a
  rule in `static/_redirects` pointing at the GitHub repo.
- `apps/inner-tube-climber/` — UA-based redirect; replaced by a
  Pages Function.
- `apps/redirects/` — Short-URL aliases; replaced by
  `functions/[[catchall]].js`.
- `apps/snoring-cat/` — `snoringcat.games` was killed during the
  migration. The Express app served snoringcat.games as a second
  domain with live SendGrid email integration; that's gone.

The `APPS` and `NO_HASH_APPS` constants at the top of `build.js`
are the source of truth for what deploys.

## Local build / preview

```powershell
npm install
npm run build         # → dist/
npm run preview       # → http://localhost:3000 (npx serve dist)
```

`serve` does NOT honor `_headers`/`_redirects`/`functions/`. To
test those locally, use Cloudflare's `wrangler pages dev`:

```powershell
npx --yes wrangler pages dev dist
```

That mounts `dist/` as the static site, applies `_headers` and
`_redirects`, and runs the `functions/` against incoming requests.

## Build pipeline (`build.js`)

1. Render HTML for each app:
   - Lodash for `apps/<app>/index.html` sources.
   - Pug for `apps/wedding/templates/invite-index.jade` (extends
     `invite-layout.jade`) and `apps/page-missing/templates/index.jade`
     (rendered to `dist/404.html`).
2. Strip cache-buster substrings (`.v1.2.3` and `?v=1.2.3`) from
   rendered HTML so refs match the unversioned filenames.
3. Copy each app's `public/` into `dist/<app>/`. For most apps,
   content-hash filenames (`main.css` → `main.<sha1>.css`) and
   record the original→hashed mapping. For Godot apps in
   `NO_HASH_APPS` (currently just `kittenbaticorn`), copy as-is —
   GODOT_CONFIG embeds asset basenames as JS string literals which
   the rewriter cannot safely update.
4. Walk `dist/` and rewrite asset references in HTML/CSS/JS using
   the manifest.
5. Copy `static/` config (sitemap, `_headers`, `_redirects`).
6. Mount `dist/hex-grid/index.html` at `dist/index.html` (the
   homepage), and copy hex-grid's favicon to `dist/favicon.ico`.

## Cache-busting protocol

Content-hashed filenames at build time. Source HTML files keep
their legacy `.v1.2.3` cache-buster placeholders for reference,
but those substrings are stripped from rendered output before the
hash-rewrite step.

Godot `.pck`/`.wasm` files are **not** content-hashed (their
filenames are referenced by JS string literals inside Godot's
runtime config, which the build doesn't parse). `_headers` gives
them a short Cache-Control instead.

## Deploying

Push to GitHub. Cloudflare Pages auto-builds on every push to
`master` and deploys to `levi.dev`. Build settings (set in the
Cloudflare dashboard):

- **Framework preset:** None.
- **Build command:** `npm install && npm run build`.
- **Build output directory:** `dist`.
- **Node version:** 20 (from `.node-version`).

Cloudflare provisions and renews HTTPS certs automatically. DNS
for `levi.dev` is at Squarespace and points at Cloudflare's
target records (apex CNAME flattening). The `devlog.levi.dev`
CNAME for Blogger is independent and unaffected.

## App-specific notes

### kittenbaticorn

Godot 4.6 web build (threaded, dlink GDExtension). The source
repo is `../ld59_private`. To redeploy a new build:

1. Re-export Godot web (in `../ld59_private`).
2. Copy `build/web/*` (NOT `index.html`) into
   `apps/kittenbaticorn/public/`.
3. Update `GODOT_CONFIG.fileSizes` in `apps/kittenbaticorn/index.html`
   to match the new byte counts.
4. Commit and push. Cloudflare picks it up on push.

**Do not bump the `cacheBuster` Lodash variable.** That mechanism
is dead — it's stripped at build time and supersesded by content
hashing for all non-Godot files. For Godot files (.pck/.wasm),
the short `_headers` Cache-Control + ETags handle freshness.

**GDExtension gotcha:** `GODOT_CONFIG.gdextensionLibs` MUST be a
bare basename (`["libkbterrain.web.template_release.wasm32.wasm"]`),
NOT `["<%= baseDir %>/libkbterrain..."]`. The string is the
Emscripten in-FS storage key, and Godot's runtime resolves the
GDExtension manifest path by basename. Adding the path prefix
breaks `findLibraryFS`.
