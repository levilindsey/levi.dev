// Cloudflare Pages Function — serves the Knotmaze app at
// https://levi.dev/knotmaze/ with the address bar staying on levi.dev.
//
// Knotmaze is a separate Pages project (https://knotmaze.pages.dev),
// deployed from github.com/levilindsey/knotmaze by that repo's own
// workflow on every push to its master. This Function is a reverse
// proxy in front of it; nothing about the app lives in this repo.
//
// - /knotmaze (no trailing slash) 301s to /knotmaze/, query kept. The
//   app is built with a RELATIVE Vite base ("./"), so its asset URLs
//   resolve against the page's directory and need the trailing slash.
// - /knotmaze/<rest> is fetched from knotmaze.pages.dev/<rest><query>
//   and passed through: status, headers and the streamed body. Upstream
//   redirects are not followed; a Location that points back at
//   knotmaze.pages.dev is rewritten under /knotmaze/. (Pages' own
//   pretty-URL redirects are root-relative, e.g. /index.html ->
//   `308 Location: /`, so Locations are resolved before comparing.)
// - GET and HEAD only; anything else is a 405.
//
// _headers rules do not apply to Function responses, so the browser
// gets knotmaze's own headers: no CSP, and Pages' default caching,
// which has browsers revalidate every file against its ETag.
// Conditional requests are forwarded, so revalidations come back as
// 304s. Every request under /knotmaze/ (page and assets) is one
// Functions invocation plus one subrequest.

const PREFIX = '/knotmaze';
const UPSTREAM = 'https://knotmaze.pages.dev';

export async function onRequest(context) {
	const { request } = context;
	if (request.method !== 'GET' && request.method !== 'HEAD') {
		return new Response('Method not allowed', {
			status: 405,
			headers: { Allow: 'GET, HEAD' },
		});
	}

	const url = new URL(request.url);
	// This file only matches /knotmaze and /knotmaze/... (in any letter
	// case), so what follows the prefix is either empty or starts with "/".
	const rest = url.pathname.slice(PREFIX.length);
	if (rest === '') {
		return Response.redirect(new URL(`${PREFIX}/${url.search}`, url).href, 301);
	}

	// Assign the path through the URL object rather than resolving a
	// string against UPSTREAM: "/knotmaze//evil.example/" must stay on
	// knotmaze.pages.dev, not become a protocol-relative URL.
	const upstreamUrl = new URL(UPSTREAM);
	upstreamUrl.pathname = rest;
	upstreamUrl.search = url.search;

	const headers = new Headers(request.headers);
	headers.delete('cookie'); // levi.dev's cookies are not knotmaze's business.

	let upstream;
	try {
		upstream = await fetch(upstreamUrl, {
			method: request.method,
			headers,
			redirect: 'manual',
		});
	} catch (err) {
		return new Response(`Bad gateway: ${err}`, { status: 502 });
	}

	const outHeaders = new Headers(upstream.headers);
	const location = outHeaders.get('Location');
	if (location) {
		let target = null;
		try {
			target = new URL(location, upstreamUrl);
		} catch {
			// Unparseable: pass it through untouched.
		}
		if (target && target.origin === UPSTREAM) {
			const path = `${PREFIX}${target.pathname}${target.search}${target.hash}`;
			outHeaders.set('Location', new URL(path, url).href);
		}
	}

	return new Response(upstream.body, {
		status: upstream.status,
		statusText: upstream.statusText,
		headers: outHeaders,
	});
}
