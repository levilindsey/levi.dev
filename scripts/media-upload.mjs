#!/usr/bin/env node
// Upload a portfolio post's prepared media to the levi-portfolio-media
// R2 bucket, where functions/media/[[path]].js serves it at
// https://levi.dev/media/<post-id>/<file>.
//
//   . ~/.claude/secrets/personal-cloudflare.ps1      # CLOUDFLARE_API_TOKEN
//   node scripts/media-upload.mjs <post-id> <dir> [--dry-run] [--verify]
//   npm run media:upload -- <post-id> <dir>
//
// PUTs every file directly inside <dir> to the object key
// <post-id>/<file> through the Cloudflare REST API (the same endpoint
// `wrangler r2 object put --remote` uses), with Content-Type from the
// extension, 4 uploads at a time. Re-running overwrites. The token
// needs the "Workers R2 Storage: Edit" permission on the account.
//
// --verify then requests https://levi.dev/media/<post-id>/<file> for
// each upload and reports status + bytes. Replaced files can be served
// from the edge cache for up to a week (see the Function); a new file
// name is live immediately.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BUCKET = 'levi-portfolio-media';
const DEFAULT_ACCOUNT_ID = '7ffa3f982c11a7b588f5500cdb8bc692';
const PUBLIC_BASE = 'https://levi.dev/media';
const CONCURRENCY = 4;

const CONTENT_TYPES = {
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.mp4': 'video/mp4',
	'.webm': 'video/webm',
};

function fail(msg) {
	console.error(msg);
	process.exit(2);
}

export async function putObject({ accountId, token, key, body, contentType }) {
	const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}`
		+ `/r2/buckets/${BUCKET}/objects/${encodeURIComponent(key)}`;
	const res = await fetch(url, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': contentType,
		},
		body,
	});
	const json = await res.json().catch(() => null);
	if (!res.ok || !json?.success) {
		const errors = json?.errors ? JSON.stringify(json.errors) : '';
		throw new Error(`PUT ${key}: HTTP ${res.status} ${errors}`);
	}
	return json.result;
}

async function runPool(tasks, limit) {
	const results = [];
	let next = 0;
	async function worker() {
		while (next < tasks.length) {
			const i = next++;
			results[i] = await tasks[i]();
		}
	}
	await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
	return results;
}

async function main() {
	const argv = process.argv.slice(2);
	const flags = new Set(argv.filter((a) => a.startsWith('--')));
	const positional = argv.filter((a) => !a.startsWith('--'));
	for (const f of flags) {
		if (!['--dry-run', '--verify'].includes(f)) fail(`unknown option ${f}`);
	}
	if (positional.length !== 2) {
		fail('usage: node scripts/media-upload.mjs <post-id> <dir> [--dry-run] [--verify]');
	}
	const [postId, dir] = positional;
	if (!/^[a-z0-9][a-z0-9.-]*$/.test(postId)) fail(`post id must be kebab-case: ${postId}`);

	const dryRun = flags.has('--dry-run');
	const token = process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_PAGES_TOKEN;
	const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || DEFAULT_ACCOUNT_ID;
	if (!token && !dryRun) {
		fail('CLOUDFLARE_API_TOKEN is not set. Dot-source ~/.claude/secrets/personal-cloudflare.ps1 first.');
	}

	const names = (await fs.readdir(dir, { withFileTypes: true }))
		.filter((e) => e.isFile())
		.map((e) => e.name)
		.sort();
	if (names.length === 0) fail(`no files in ${dir}`);

	const tasks = names.map((name) => async () => {
		const ext = path.extname(name).toLowerCase();
		const contentType = CONTENT_TYPES[ext];
		if (!contentType) {
			console.log(`  skip   ${postId}/${name} (unsupported type ${ext || 'none'})`);
			return null;
		}
		const key = `${postId}/${name}`;
		const body = await fs.readFile(path.join(dir, name));
		if (dryRun) {
			console.log(`  would  ${key}  ${body.length} bytes  ${contentType}`);
			return key;
		}
		await putObject({ accountId, token, key, body, contentType });
		console.log(`  put    ${key}  ${body.length} bytes  ${contentType}`);
		return key;
	});

	console.log(`${dryRun ? 'dry run: ' : ''}uploading ${names.length} files to r2://${BUCKET}/${postId}/`);
	const keys = (await runPool(tasks, CONCURRENCY)).filter(Boolean);

	if (flags.has('--verify') && !dryRun) {
		console.log('verifying through the Pages Function:');
		for (const key of keys) {
			const url = `${PUBLIC_BASE}/${key}`;
			const res = await fetch(url, { method: 'HEAD' });
			console.log(`  ${res.status}  ${url}  ${res.headers.get('content-length') || '?'} bytes`);
		}
	}
}

// Only run main() when executed directly; the migration script imports
// putObject() from here.
const invokedDirectly = process.argv[1]
	&& path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
	main().catch((err) => {
		console.error(err.message || err);
		process.exit(1);
	});
}
