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
  - `[[catchall]].js` — ~50 short-URL aliases. **The only copy**: the
    Express-era mirror `apps/redirects/routes.js` was removed
    2026-10. To add an alias, append an entry: `rx` (regex on the
    pathname), `to` (URL), optional `keepQuery: true` to forward the
    query string (knotmaze keeps its state in the URL).
  - `media/[[path]].js` — serves portfolio media from the R2 bucket
    `levi-portfolio-media` at `/media/<post-id>/<file>`. See
    "Portfolio media (R2)" below.
  - `inner-tube-climber/[[path]].js` — User-Agent-based redirect
    to Play Store (Android) / App Store (iOS) / itch.io
    (everything else).
  - `kittenbaticorn/index.side.wasm.js` — streams the >25 MiB Godot
    side wasm from R2 (`ASSETS_BUCKET` → `levi-dev-assets`).
- `build.js` — The build pipeline. Run via `npm run build`.
- `scripts/` — `vendor-hex-grid.ps1` (refresh the vendored hex-grid
  build), `media-prepare.mjs` (compress/normalize post images with
  sharp), `media-upload.mjs` (push them to R2). npm aliases:
  `npm run vendor`, `npm run media:prepare`, `npm run media:upload`.

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
5. Copy `static/` config (`_headers`, `_redirects`) and the sitemap.
   The sitemap is **derived**: hex-grid's gulp `data` task generates
   it (root + devlog + one `#<post-id>` entry per post) and the
   vendor script lands it at
   `apps/hex-grid/public/example/dist/sitemap.xml`, which `build.js`
   ships at `/sitemap.xml`. Never hand-maintain a sitemap here; the
   old `apps/sitemap.xml` copy went stale and was removed 2026-10.
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

**Direct upload from local machine via wrangler.** The Cloudflare
"Workers & Pages" dashboard wizard funnels new projects through
Workers Static Assets (which doesn't honor Pages-style
`functions/`), so we bypass the dashboard and deploy via API.

```powershell
. ~/.claude/secrets/personal-cloudflare.ps1
$env:CLOUDFLARE_ACCOUNT_ID='7ffa3f982c11a7b588f5500cdb8bc692'
npm run deploy
```

`npm run deploy` runs `node build.js` then
`wrangler pages deploy dist --project-name=levi-dev --branch=master`.

**Setup that's done once (already in place — for reference only):**

- Pages project `levi-dev` was created via
  `wrangler pages project create levi-dev --production-branch master`.
- R2 binding `ASSETS_BUCKET` → `levi-dev-assets` was attached
  via PATCH to `/accounts/<id>/pages/projects/levi-dev` with
  `deployment_configs.{production,preview}.r2_buckets`.
- R2 bucket `levi-dev-assets` was created via
  `wrangler r2 bucket create levi-dev-assets`.
- R2 bucket `levi-portfolio-media` (portfolio media, 2026-10-10) was
  created through the R2 API and bound as `MEDIA_BUCKET` with the
  same PATCH, merged alongside `ASSETS_BUCKET` (the PATCH replaces
  the whole `r2_buckets` map per environment, so always send both).
- The knots demo behind the `/knots` alias is a separate Pages
  project, `knotmaze`, deployed from github.com/levilindsey/knotmaze
  by that repo's own workflow with the same two secrets.

**Auto-deploy on git push is the normal path.**
`.github/workflows/deploy.yml` runs `npm ci && npm run build` (Node
20, per `.node-version`) and `wrangler pages deploy` on every push to
`master`, using the `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`
repo secrets. The manual `npm run deploy` above is for out-of-band
redeploys only (the `levi-dev-deploy` skill); check
`gh run list -R levilindsey/levi.dev --workflow=deploy.yml --limit 3`
first so two deploys don't race.

Cloudflare provisions and renews HTTPS certs automatically. DNS
for `levi.dev` is at Squarespace and points at Cloudflare's
target records (apex CNAME flattening). The `devlog.levi.dev`
CNAME for Blogger is independent and unaffected.

## hex-grid vendoring

The homepage is `../hex-grid`'s example app. **levi.dev does not
build hex-grid.** `apps/hex-grid/public/` is a vendored snapshot of
hex-grid's build output, refreshed only by

```powershell
npm run vendor        # scripts/vendor-hex-grid.ps1
```

which runs hex-grid's full gulp build (`gulp --series clean data
scripts styles`) and robocopy-mirrors `hex-grid/dist` →
`public/dist` and `hex-grid/example/{data,dist,images,scripts,
styles,index.html}` → `public/example/`. Post data
(`example/data/<post-id>/`) is edited in hex-grid, never here. The
`levi-dev-post` skill (claude-config) is the end-to-end procedure:
post text, media, vendor, commit both repos, deploy.

- `apps/hex-grid/index.html` is this repo's own template. Its
  `cacheBuster` var is cosmetic (stripped at build). The SEO dump
  between the `inject:combinedMetadata` markers is filled by
  `build.js` from `public/example/dist/data.min.json`; keep the
  committed markers empty.
- The runtime fetches only `/hex-grid/example/dist/data.min.json`.
  Per-post JSONs under `public/example/dist/data/` are vendored for
  parity but never requested (and get content-hashed, so their URLs
  404). Verify a deploy with
  `curl -s https://levi.dev/hex-grid/example/dist/data.min.json | grep -c '"id":"<post-id>"'`.
- `.gitignore` ignores only the root `/dist`; the vendored
  `public/dist` and `public/example/dist` are committed.
- hex-grid's `example/docs` (stale SVG masters) and `example/gulp`
  are deliberately not vendored.

## Portfolio media (R2)

Post logos, thumbnails, and carousel images are served from the R2
bucket `levi-portfolio-media` through `functions/media/[[path]].js`
at `https://levi.dev/media/<post-id>/<file>`, which is the `baseUrl`
in hex-grid's `example/data/collection-metadata.json`. Migrated
2026-10-10 from the public S3 bucket of the same name (us-west-2),
which is now a cold backup until deleted. levi.dev's DNS is at
Squarespace, so the bucket cannot have a custom domain of its own;
the Function is its public face and caches at the edge for a week.

Per post:

```powershell
. ~/.claude/secrets/personal-cloudflare.ps1      # CLOUDFLARE_API_TOKEN (has R2 Edit)
npm run media:prepare -- <raw-dir>               # → <raw-dir>/ready, prints before/after
npm run media:upload -- <post-id> <raw-dir>/ready --verify
```

What hex-grid's layout expects, enforced by `media-prepare`:
`logo.png` 128 px tall (any width), `thumbnail.png` 128×128,
screenshots as palette-quantized PNG, captures as GIF (0.5–3 MB
each is typical). Object key = `<post-id>/<file>`; re-uploading
overwrites, but a replaced file may stay edge-cached for up to a
week, so prefer a new file name for a changed image.

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
