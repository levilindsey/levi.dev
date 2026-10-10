// Cloudflare Pages Function — serves portfolio media from R2.
//
// Every hex-grid post's logo, thumbnail, and carousel images live in
// the R2 bucket `levi-portfolio-media` under `<post-id>/<file>` and are
// requested at https://levi.dev/media/<post-id>/<file> — the `baseUrl`
// in hex-grid's example/data/collection-metadata.json. levi.dev's DNS
// is at Squarespace, not Cloudflare, so the bucket cannot get a custom
// domain of its own; this Function is its public face instead.
//
// Upload:  node scripts/media-upload.mjs <post-id> <dir>   (sets
//          Content-Type on each object).
// Binding: MEDIA_BUCKET -> levi-portfolio-media on the levi-dev Pages
//          project, production AND preview, attached via
//            PATCH /accounts/<id>/pages/projects/levi-dev
//            deployment_configs.{production,preview}.r2_buckets
//              .MEDIA_BUCKET = { name: "levi-portfolio-media" }
//          (same mechanism as ASSETS_BUCKET for kittenbaticorn).
//
// Responses are cached at the edge (per colo) through the Cache API;
// _headers rules do not apply to Function responses, so caching
// headers are set here.

const CONTENT_TYPES = {
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	gif: 'image/gif',
	webp: 'image/webp',
	svg: 'image/svg+xml',
	mp4: 'video/mp4',
	webm: 'video/webm',
};

// A week in browsers and at the edge. Media is referenced by a stable
// file name per post; a replaced file propagates within the week, a
// new file name is live immediately.
const CACHE_CONTROL = 'public, max-age=604800';

export async function onRequest(context) {
	const { request, env, params } = context;
	if (request.method !== 'GET' && request.method !== 'HEAD') {
		return new Response('Method not allowed', {
			status: 405,
			headers: { Allow: 'GET, HEAD' },
		});
	}

	const bucket = env?.MEDIA_BUCKET;
	if (!bucket) {
		// Diagnostic surface: the R2 binding on the levi-dev Pages
		// project was wiped or renamed. See the header comment.
		return new Response('R2 binding MEDIA_BUCKET missing', { status: 500 });
	}

	// params.path is the array of segments matched by [[path]].
	const segments = Array.isArray(params.path) ? params.path : [params.path];
	let key;
	try {
		key = segments.map(decodeURIComponent).join('/');
	} catch {
		return new Response('Bad request', { status: 400 });
	}
	if (!key || key.includes('..') || key.startsWith('/')) {
		return new Response('Not found', { status: 404 });
	}

	const cache = caches.default;
	const cacheKey = new Request(request.url, { method: 'GET' });
	const cached = await cache.match(cacheKey);
	if (cached) {
		return request.method === 'HEAD'
			? new Response(null, { status: cached.status, headers: cached.headers })
			: cached;
	}

	const obj = await bucket.get(key);
	if (!obj) {
		return new Response('Not found', { status: 404 });
	}

	const headers = new Headers();
	obj.writeHttpMetadata(headers);
	if (!headers.get('Content-Type')) {
		const ext = key.slice(key.lastIndexOf('.') + 1).toLowerCase();
		headers.set('Content-Type', CONTENT_TYPES[ext] || 'application/octet-stream');
	}
	headers.set('Content-Length', String(obj.size));
	headers.set('Cache-Control', CACHE_CONTROL);
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('ETag', obj.httpEtag);

	if (request.headers.get('If-None-Match') === obj.httpEtag) {
		return new Response(null, { status: 304, headers });
	}
	if (request.method === 'HEAD') {
		return new Response(null, { status: 200, headers });
	}

	const response = new Response(obj.body, { status: 200, headers });
	context.waitUntil(cache.put(cacheKey, response.clone()));
	return response;
}
