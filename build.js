'use strict';

// Builds the static site into dist/.
//
// Pipeline:
//   1. Render HTML for each app (Lodash for apps/<app>/index.html
//      sources, Pug for apps/<app>/templates/*.jade sources). Strip
//      cache-buster substrings (".v1.2.3" / "?v=1.2.3") from the
//      rendered output so refs match the unversioned filenames in
//      apps/<app>/public/.
//   2. Render apps/page-missing/templates/index.jade to dist/404.html.
//   3. Copy each app's public/ into dist/<app>/. For most apps,
//      content-hash filenames (e.g. main.css → main.<sha1>.css) and
//      record original→hashed in an in-memory manifest. For Godot
//      apps in NO_HASH_APPS, copy as-is — references to .pck/.wasm
//      live inside JS string literals (GODOT_CONFIG) which we cannot
//      safely rewrite.
//   4. Walk dist/ and rewrite asset references in HTML/CSS/JS to
//      the hashed names from the manifest.
//   5. Copy static config: sitemap.xml, _headers, _redirects.
//
// Run: `npm run build`.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const lodashTemplate = require('lodash.template');
const pug = require('pug');

// ---------------------------------------------------------------- //
// Config.
// ---------------------------------------------------------------- //

const APPS_DIR = 'apps';
const DIST_DIR = 'dist';
const STATIC_DIR = 'static';

// Apps included in the deploy.
const APPS = [
	'chess',
	'dancing-spokes',
	'dynamics',
	'hex-grid',
	'kittenbaticorn',
	'metabounce',
	'page-missing',
	'progress-circle',
	'space-debris',
	'squared-away',
	'text-animation',
	'wedding',
];

// Apps NOT deployed (left in git for history):
//   aldenwitt.com      — Vestigial; routing only allowed
//                        portfolio domains, so this never served.
//   fat-cat-chat       — Just a redirect; replaced with a rule in
//                        _redirects.
//   inner-tube-climber — UA-based redirect; replaced with a Pages
//                        Function (functions/inner-tube-climber.js).
//   redirects          — ~50 short-URL aliases; replaced with a
//                        Pages Function (functions/[[catchall]].js).
//   snoring-cat        — snoringcat.games is being killed.

// Apps whose assets must NOT be content-hashed. References to .wasm
// and .pck files live inside JS string literals in Godot's
// GODOT_CONFIG, which our HTML/CSS rewriter cannot reliably update.
// Hashing would silently break engine load. _headers gives these a
// short Cache-Control instead.
const NO_HASH_APPS = new Set(['kittenbaticorn']);

// Path patterns (POSIX-style, relative to dist root, e.g.
// "hex-grid/example/data/foo.json") that must NOT be content-hashed.
// Same reason as NO_HASH_APPS: refs are constructed at runtime by
// JS string concatenation that the rewriter cannot follow.
const NO_HASH_PATTERNS = [
	// hex-grid example dynamically fetches per-post data files.
	/^hex-grid\/example\/data\//,
	/^hex-grid\/example\/dist\/data\.min\.json$/,
];

// Path patterns to drop entirely from dist/. Used for assets that
// exceed Cloudflare's 25 MiB per-file cap and are served via R2 +
// a Pages Function proxy instead. Any file matching is NOT copied
// into dist/ (the corresponding Function in functions/ handles the
// URL at request time).
const SKIP_DEPLOY_PATTERNS = [
	// Godot's threaded-export side wasm. Served by
	// functions/kittenbaticorn/index.side.wasm.js from R2.
	/^kittenbaticorn\/index\.side\.wasm$/,
];

function shouldHashPath(relPosixPath) {
	return !NO_HASH_PATTERNS.some(rx => rx.test(relPosixPath));
}

function shouldDeployPath(relPosixPath) {
	return !SKIP_DEPLOY_PATTERNS.some(rx => rx.test(relPosixPath));
}

// Asset extensions to content-hash (within hashable apps only).
const HASHABLE_EXTENSIONS = new Set([
	'.css', '.js', '.json', '.jpg', '.jpeg', '.png', '.gif',
	'.svg', '.ico', '.m4a', '.ogg', '.mp3', '.mp4', '.webp',
	'.woff', '.woff2', '.ttf', '.otf', '.eot',
]);

// File types we'll search for asset references and rewrite.
const REWRITABLE_EXTENSIONS = new Set(['.html', '.css', '.js']);

const GA4_ID = 'G-SPHSZD3C8T';
const TEMPLATE_LOCALS = {
	portfolioAnalyticsScriptGA4ID: GA4_ID,
	portfolioAnalyticsScriptGA4:
		'<!-- Google tag (gtag.js) -->' +
		'<script async src="https://www.googletagmanager.com/gtag/js?id=' + GA4_ID + '"></script>' +
		'<script>' +
			'window.dataLayer=window.dataLayer||[];' +
			'function gtag(){dataLayer.push(arguments);}' +
			'gtag(\'js\',new Date());' +
			'gtag(\'config\',\'' + GA4_ID + '\');' +
		'</script>',
};

// Strip cache-buster substrings from rendered output so asset refs
// match the unversioned filenames on disk.
//   ".v1.2.3"  → ""    e.g. main.v1.2.3.css   → main.css
//   "?v=1.2.3" → ""    e.g. main.css?v=1.2.3  → main.css
const FILENAME_CACHEBUSTER_RX = /\.v[\d.\-]+(?=\.[a-zA-Z0-9]+\b)/g;
const QUERY_CACHEBUSTER_RX = /\?v=[\d.\-]+/g;

function stripCacheBusters(text) {
	return text
		.replace(FILENAME_CACHEBUSTER_RX, '')
		.replace(QUERY_CACHEBUSTER_RX, '');
}

// ---------------------------------------------------------------- //
// Steps.
// ---------------------------------------------------------------- //

async function build() {
	const t0 = Date.now();

	console.log('[clean] removing ' + DIST_DIR);
	await fs.promises.rm(DIST_DIR, { recursive: true, force: true });
	await fs.promises.mkdir(DIST_DIR, { recursive: true });

	console.log('[render] rendering app HTML');
	for (const app of APPS) {
		await renderAppHtml(app);
	}

	console.log('[render] rendering 404.html');
	await render404();

	console.log('[copy] copying assets and building manifest');
	const manifest = {};
	for (const app of APPS) {
		await copyAppAssets(app, manifest);
	}
	const manifestEntries = Object.keys(manifest).length;
	console.log('  ' + manifestEntries + ' assets hashed');

	console.log('[rewrite] rewriting asset references');
	await rewriteRefs(manifest);

	console.log('[static] copying static config');
	await copyStaticConfig();

	console.log('[homepage] mounting hex-grid at /');
	await copyHomepage();

	const seconds = ((Date.now() - t0) / 1000).toFixed(1);
	console.log('[done] built ' + DIST_DIR + ' in ' + seconds + 's');
}

async function renderAppHtml(app) {
	const indexHtml = path.join(APPS_DIR, app, 'index.html');
	const inviteJade = path.join(APPS_DIR, app, 'templates', 'invite-index.jade');
	const indexJade = path.join(APPS_DIR, app, 'templates', 'index.jade');
	const noScriptJade = path.join(APPS_DIR, app, 'templates', 'invite-no-script.jade');

	if (await exists(indexHtml)) {
		// Lodash-templated source. The source declares its own
		// `baseDir` and `cacheBuster` locals via inline `<% var ... %>`
		// blocks; we just inject the analytics scripts.
		const src = await fs.promises.readFile(indexHtml, 'utf8');
		const compiled = lodashTemplate(src);
		let rendered = compiled(TEMPLATE_LOCALS);
		rendered = stripCacheBusters(rendered);
		await writeDist(path.join(app, 'index.html'), rendered);
		console.log('  ' + app + '/index.html (lodash)');
	} else if (await exists(inviteJade)) {
		// Pug (Jade is deprecated but Pug is API-compatible). Used
		// only by wedding/.
		const compiled = pug.compileFile(inviteJade, {
			basedir: path.join(APPS_DIR, app, 'templates'),
		});
		let rendered = compiled(TEMPLATE_LOCALS);
		rendered = stripCacheBusters(rendered);
		await writeDist(path.join(app, 'index.html'), rendered);
		console.log('  ' + app + '/index.html (pug, invite-index)');

		if (await exists(noScriptJade)) {
			const noScriptCompiled = pug.compileFile(noScriptJade, {
				basedir: path.join(APPS_DIR, app, 'templates'),
			});
			let noScriptRendered = noScriptCompiled(TEMPLATE_LOCALS);
			noScriptRendered = stripCacheBusters(noScriptRendered);
			await writeDist(
				path.join(app, 'invite-no-script.html'), noScriptRendered);
			console.log('  ' + app + '/invite-no-script.html (pug)');
		}
	} else if (await exists(indexJade)) {
		// Generic templates/index.jade flow (currently only used by
		// page-missing, but render404() handles that explicitly).
		// Falls through here only if some other app uses this layout.
		const compiled = pug.compileFile(indexJade, {
			basedir: path.join(APPS_DIR, app, 'templates'),
		});
		let rendered = compiled(TEMPLATE_LOCALS);
		rendered = stripCacheBusters(rendered);
		await writeDist(path.join(app, 'index.html'), rendered);
		console.log('  ' + app + '/index.html (pug, index)');
	} else {
		console.log('  ' + app + ' (no HTML source — assets only)');
	}
}

async function render404() {
	const src = path.join(APPS_DIR, 'page-missing', 'templates', 'index.jade');
	if (!(await exists(src))) {
		console.warn('  no 404 source at ' + src);
		return;
	}
	const compiled = pug.compileFile(src, {
		basedir: path.join(APPS_DIR, 'page-missing', 'templates'),
	});
	// `pageName` is the original Express-side dynamic value (the
	// requested URL); on a static host we render an empty placeholder
	// and let client-side JS fill it from window.location if needed.
	let rendered = compiled({
		...TEMPLATE_LOCALS,
		pageName: '',
		status: 404,
	});
	rendered = stripCacheBusters(rendered);
	// Rewrite /page-missing/ asset paths to root-relative paths so the
	// 404 page works even when served at arbitrary URLs.
	rendered = rendered.split('/page-missing/').join('/page-missing/');
	await writeDist('404.html', rendered);
	console.log('  404.html (from page-missing/templates/index.jade)');
}

async function copyAppAssets(app, manifest) {
	const publicDir = path.join(APPS_DIR, app, 'public');
	if (!(await exists(publicDir))) return;
	const hashable = !NO_HASH_APPS.has(app);
	await copyTree(publicDir, path.join(DIST_DIR, app), hashable, app, '', manifest);
}

async function copyTree(srcDir, dstDir, hashable, app, relSubdir, manifest) {
	await fs.promises.mkdir(dstDir, { recursive: true });
	const entries = await fs.promises.readdir(srcDir, { withFileTypes: true });
	for (const entry of entries) {
		const srcPath = path.join(srcDir, entry.name);
		if (entry.isDirectory()) {
			await copyTree(
				srcPath,
				path.join(dstDir, entry.name),
				hashable,
				app,
				relSubdir ? relSubdir + '/' + entry.name : entry.name,
				manifest,
			);
			continue;
		}
		if (!entry.isFile()) continue;

		// Skip files we generate ourselves or that shouldn't ship.
		if (entry.name === 'index.html' && relSubdir === '') {
			continue;  // Already rendered above.
		}
		if (entry.name === '_headers' || entry.name === '_redirects') {
			continue;  // Use the global static/ ones.
		}

		const ext = path.extname(entry.name).toLowerCase();
		let dstName = entry.name;

		// Manifest keys/values use forward-slash POSIX paths, rooted at
		// the app name. e.g. "hex-grid/example/main.css" →
		// "hex-grid/example/main.abc1234567.css".
		const relSrc = relSubdir
			? app + '/' + relSubdir + '/' + entry.name
			: app + '/' + entry.name;

		if (!shouldDeployPath(relSrc)) {
			continue;  // Served at runtime by a Pages Function from R2.
		}

		// Strip cache-buster substrings from copied HTML/CSS/JS so the
		// later rewriteRefs() step can match the unversioned manifest
		// keys. Hash the *stripped* content so the hash is stable
		// across deploys that only bumped the cache-buster.
		const isRewritable = REWRITABLE_EXTENSIONS.has(ext);
		let buf;
		if (isRewritable) {
			const text = await fs.promises.readFile(srcPath, 'utf8');
			buf = Buffer.from(stripCacheBusters(text));
		}

		if (hashable && HASHABLE_EXTENSIONS.has(ext) && shouldHashPath(relSrc)) {
			if (!buf) {
				buf = await fs.promises.readFile(srcPath);
			}
			const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 10);
			const stem = entry.name.slice(0, entry.name.length - ext.length);
			dstName = stem + '.' + hash + ext;

			const relDst = relSubdir
				? app + '/' + relSubdir + '/' + dstName
				: app + '/' + dstName;
			manifest[relSrc] = relDst;
		}

		const finalDst = path.join(dstDir, dstName);
		if (buf) {
			await fs.promises.writeFile(finalDst, buf);
		} else {
			await fs.promises.copyFile(srcPath, finalDst);
		}
	}
}

async function rewriteRefs(manifest) {
	if (Object.keys(manifest).length === 0) return;

	const files = await walkFiles(DIST_DIR);
	let touched = 0;
	for (const file of files) {
		const ext = path.extname(file).toLowerCase();
		if (!REWRITABLE_EXTENSIONS.has(ext)) continue;

		let text = await fs.promises.readFile(file, 'utf8');
		const original = text;

		for (const [orig, hashed] of Object.entries(manifest)) {
			// Match the original path as a URL substring. The path is
			// preceded by either "/" (absolute) or a delimiter that
			// implies a relative URL (less common in this project).
			// Use a literal split/join for robustness — manifest keys
			// are unique enough that accidental matches in arbitrary
			// JS strings are unlikely. The Godot apps that DO have
			// arbitrary string refs are in NO_HASH_APPS and so don't
			// contribute manifest entries.
			text = text.split('/' + orig).join('/' + hashed);
		}

		if (text !== original) {
			await fs.promises.writeFile(file, text);
			touched++;
		}
	}
	console.log('  ' + touched + ' files rewritten');
}

// Hex-grid is the portfolio homepage. The Express server served it
// at both / and /hex-grid; replicate that on the static deploy by
// copying the rendered (rev-rewritten) hex-grid/index.html to the
// site root. All asset refs in that HTML are absolute (/hex-grid/...)
// so they resolve correctly from either path.
async function copyHomepage() {
	const src = path.join(DIST_DIR, 'hex-grid', 'index.html');
	if (await exists(src)) {
		await fs.promises.copyFile(src, path.join(DIST_DIR, 'index.html'));
		console.log('  index.html (from hex-grid)');
	}
	// Browsers ask for /favicon.ico by default. The Express server
	// served the hex-grid PNG for it via serve-favicon middleware.
	// Replicate by copying the PNG to /favicon.ico (browsers content-
	// sniff and accept it).
	const favSrc = path.join(APPS_DIR, 'hex-grid', 'public', 'example', 'images', 'favicon-32x32.png');
	if (await exists(favSrc)) {
		await fs.promises.copyFile(favSrc, path.join(DIST_DIR, 'favicon.ico'));
		console.log('  favicon.ico (from hex-grid favicon-32x32.png)');
	}
}

async function copyStaticConfig() {
	// Sitemap lives at the apps/ root for legacy reasons.
	const sitemap = path.join(APPS_DIR, 'sitemap.xml');
	if (await exists(sitemap)) {
		await fs.promises.copyFile(sitemap, path.join(DIST_DIR, 'sitemap.xml'));
		console.log('  sitemap.xml');
	}

	// Everything in static/ is copied verbatim to dist/.
	if (await exists(STATIC_DIR)) {
		const files = await walkFiles(STATIC_DIR);
		for (const file of files) {
			const rel = path.relative(STATIC_DIR, file);
			const dst = path.join(DIST_DIR, rel);
			await fs.promises.mkdir(path.dirname(dst), { recursive: true });
			await fs.promises.copyFile(file, dst);
			console.log('  ' + rel);
		}
	}
}

// ---------------------------------------------------------------- //
// Helpers.
// ---------------------------------------------------------------- //

async function walkFiles(dir) {
	const out = [];
	const entries = await fs.promises.readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		const p = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			out.push(...await walkFiles(p));
		} else if (entry.isFile()) {
			out.push(p);
		}
	}
	return out;
}

async function exists(p) {
	try {
		await fs.promises.access(p);
		return true;
	} catch {
		return false;
	}
}

async function writeDist(relPath, content) {
	const full = path.join(DIST_DIR, relPath);
	await fs.promises.mkdir(path.dirname(full), { recursive: true });
	await fs.promises.writeFile(full, content);
}

// ---------------------------------------------------------------- //

build().catch((err) => {
	console.error(err);
	process.exit(1);
});
