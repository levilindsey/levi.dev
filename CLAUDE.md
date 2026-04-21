# CLAUDE.md

Personal portfolio + games site. Express + Jade, deployed to
Heroku as the `levi-dev` app from this repo's `master` branch.

## Layout

- `apps/<app-name>/` — One subfolder per app. May contain:
  - `index.html` — Jade-templated entry page (server-side
    templating). Or:
  - `templates/index.jade` — Same idea, via the templating engine.
  - `public/` — Static assets served at `/<app-name>/...`.
  - `routes.js` — Optional custom routing. If absent,
    `server/routes/view-routes.js` falls back to default routing.
- `server/middleware/middleware.js` — Cross-cutting middleware:
  - `attachCacheBusterRemover` strips `.vX.Y.Z` from URLs ending
    in `.css/.js/.json/.jpg/.png/.gif/.svg/.ico/.m4a/.ogg` so the
    server can resolve them to the unversioned files in `public/`.
  - `attachCrossOriginIsolationHeaders` sets COOP/COEP for
    `/kittenbaticorn` (Godot threaded export needs
    SharedArrayBuffer).
- `server/routes/view-routes.js` — Auto-attaches a route per app
  folder. Detects whether to use Jade templating (`templates/`
  present) or to send a static `index.html`.

## Deploying

```bash
git add <changed files>
git commit -m "<short imperative summary>"
git push heroku master
```

Heroku auto-detects Node, runs `npm install`, then `npm start`
per the `Procfile`. Build logs stream to stdout.

### First-time setup on a new machine

```bash
heroku login
cd <repo>
heroku git:remote -a levi-dev
```

## Cache-busting protocol

The Jade templates use a `cacheBuster` local (e.g. `.v1.0.1`)
inserted before the file extension of every external asset URL.
Bump it on each deploy so browsers refetch.

**Important:** the cache-buster middleware only handles a fixed
file-type list. `.wasm` and `.pck` are NOT in that list, so URLs
that reference them stay literal — and they are NOT cache-busted.
Browsers may serve stale `.wasm`/`.pck` until the freshly-loaded
JS asks for them again. For Godot apps, also update
`GODOT_CONFIG.fileSizes` in the app's `index.html` so the engine
preflight matches the actual byte counts.

## App-specific deploy notes

### kittenbaticorn

A Godot 4.6 web build (threaded, dlink GDExtension). The source
repo is `../ld59_private`; that repo's `CLAUDE.md` has the
end-to-end "Deploying to levi.dev/kittenbaticorn" recipe.
Tl;dr: re-export web, copy `build/web/*` (NOT `index.html`) into
`apps/kittenbaticorn/public/`, bump `cacheBuster`, update
`GODOT_CONFIG.fileSizes`, commit, `git push heroku master`.
