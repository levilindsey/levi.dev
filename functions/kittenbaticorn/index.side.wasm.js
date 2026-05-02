// Cloudflare Pages Function — serves kittenbaticorn's Godot threaded
// side-wasm (~38.5 MiB) from R2 because it exceeds Cloudflare's 25 MiB
// per-asset cap and can't ship as a static file under dist/.
//
// Godot's web template fetches the side wasm at the hardcoded URL
// `<executable>.side.wasm` (i.e. /kittenbaticorn/index.side.wasm). This
// Function intercepts that URL, pulls the bytes from R2 via the
// ASSETS_BUCKET binding, and streams them back as if it were a static
// asset. Same-origin response → no COOP/COEP headaches.
//
// To re-upload the wasm whenever kittenbaticorn rebuilds (the file
// content changes between Godot exports):
//
//   . ~/.claude/secrets/personal-cloudflare.ps1
//   $env:CLOUDFLARE_ACCOUNT_ID='7ffa3f982c11a7b588f5500cdb8bc692'
//   npx wrangler r2 object put `
//     levi-dev-assets/kittenbaticorn/index.side.wasm `
//     --file dist/kittenbaticorn/index.side.wasm `
//     --content-type application/wasm `
//     --remote
//
// (See CLAUDE.md for the full kittenbaticorn redeploy recipe.)

export async function onRequest(context) {
	const bucket = context.env?.ASSETS_BUCKET;
	if (!bucket) {
		// Diagnostic surface: if you see this in production, the R2
		// binding on the levi-dev Pages project was wiped or renamed.
		// Reset via:
		//   PATCH /accounts/<id>/pages/projects/levi-dev with
		//   deployment_configs.{production,preview}.r2_buckets.ASSETS_BUCKET
		//   = { name: "levi-dev-assets" }
		return new Response('R2 binding ASSETS_BUCKET missing', {
			status: 500,
		});
	}
	const obj = await bucket.get('kittenbaticorn/index.side.wasm');
	if (!obj) {
		return new Response('Object not found in R2', { status: 404 });
	}
	const headers = new Headers();
	headers.set('Content-Type', 'application/wasm');
	if (obj.httpEtag) {
		headers.set('ETag', obj.httpEtag);
	}
	// Short cache so re-uploads propagate within minutes; ETags
	// handle conditional GET revalidation for unchanged content.
	headers.set('Cache-Control', 'public, max-age=300, must-revalidate');
	return new Response(obj.body, { headers });
}
