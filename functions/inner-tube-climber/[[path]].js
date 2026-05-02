// Cloudflare Pages Function — User-Agent-based redirect for
// /inner-tube-climber and any subpath.
//
// Android UA → Google Play Store
// iOS UA     → Apple App Store
// Otherwise  → itch.io
//
// Ported from apps/inner-tube-climber/routes.js (pre-migration).

const ANDROID_RX = /(\bandroid\b)/i;
const IOS_RX = /(\bmac os\b|\bios\b|\biphone\b|\bipad\b|\bipod\b)/i;

const ITCHIO_URL = 'https://levilindsey.itch.io/stuck-in-an-inner-tube';
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=dev.levi.inner_tube_climber';
const IOS_URL = 'https://apps.apple.com/us/app/inner-tube-climber/id1553158659';

export async function onRequest(context) {
	const userAgent = context.request.headers.get('user-agent') || '';
	let target;
	if (IOS_RX.test(userAgent)) {
		target = IOS_URL;
	} else if (ANDROID_RX.test(userAgent)) {
		target = ANDROID_URL;
	} else {
		target = ITCHIO_URL;
	}
	// 302 (not 301) so different UAs land on different stores
	// without accumulating browser-cached redirects.
	const response = Response.redirect(target, 302);
	// Tell caches that the response varies by UA so Cloudflare's
	// edge cache doesn't serve an iOS user the Android response.
	const headers = new Headers(response.headers);
	headers.set('Vary', 'User-Agent');
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}
