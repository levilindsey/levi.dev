#!/usr/bin/env node
// Prepare a portfolio post's media for upload: compress PNG/JPEG/GIF
// and normalize the logo and thumbnail to the sizes the hex-grid
// layout expects. Replaces the imagecompressor.com step.
//
//   node scripts/media-prepare.mjs <raw-dir> [options]
//   npm run media:prepare -- <raw-dir> [options]
//
// Reads every image directly inside <raw-dir> and writes optimized
// copies to <raw-dir>/ready (or --out <dir>). Rules:
//
//   logo.*        -> logo.png, 128 px tall (width follows the source),
//                    palette PNG. Shown in a 45%-wide x 50 px box with
//                    background-size: contain.
//   thumbnail.*   -> thumbnail.png, 128x128, palette PNG. --thumb-fit
//                    contain (default, transparent padding) or cover.
//   *.png         -> palette-quantized PNG via libimagequant (what
//                    pngquant / imagecompressor.com do). --png-quality N
//                    (default 90).
//   *.jpg/*.jpeg  -> mozjpeg, quality 82.
//   *.gif         -> re-encoded, animation preserved. --gif-colours N
//                    (default 128), --gif-frame-error N (default 4; 0 is
//                    lossless between frames), --gif-lossless.
//   *.webp        -> re-encoded webp (quality 82).
//   --max-width N -> downscale anything wider than N px (default 1600;
//                    logo and thumbnail are exempt).
//
// Apart from the logo and thumbnail, a file is never written larger
// than its source: if the re-encode doesn't shrink it, the source is
// copied as-is. Prints a before/after table. Upload the ready/ dir with
// scripts/media-upload.mjs.

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const USAGE = 'usage: node scripts/media-prepare.mjs <raw-dir> [--out <dir>] '
	+ '[--max-width N] [--png-quality N] [--gif-colours N] [--gif-frame-error N] '
	+ '[--gif-lossless] [--thumb-fit contain|cover]';

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);

function parseArgs(argv) {
	const args = {
		out: null,
		maxWidth: 1600,
		pngQuality: 90,
		gifColours: 128,
		gifFrameError: 4,
		gifLossless: false,
		thumbFit: 'contain',
	};
	const positional = [];
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		const next = () => {
			if (i + 1 >= argv.length) fail(`${a} needs a value`);
			return argv[++i];
		};
		switch (a) {
			case '--out': args.out = next(); break;
			case '--max-width': args.maxWidth = Number(next()); break;
			case '--png-quality': args.pngQuality = Number(next()); break;
			case '--gif-colours': args.gifColours = Number(next()); break;
			case '--gif-frame-error': args.gifFrameError = Number(next()); break;
			case '--gif-lossless': args.gifLossless = true; break;
			case '--thumb-fit': args.thumbFit = next(); break;
			case '-h':
			case '--help':
				console.log(USAGE);
				process.exit(0);
			default:
				if (a.startsWith('--')) fail(`unknown option ${a}`);
				positional.push(a);
		}
	}
	if (positional.length !== 1) fail(USAGE);
	if (!['contain', 'cover'].includes(args.thumbFit)) fail('--thumb-fit must be contain or cover');
	args.rawDir = path.resolve(positional[0]);
	args.out = path.resolve(args.out || path.join(args.rawDir, 'ready'));
	return args;
}

function fail(msg) {
	console.error(msg);
	process.exit(2);
}

function pngOptions(args) {
	return { palette: true, quality: args.pngQuality, effort: 10, compressionLevel: 9 };
}

async function encode(name, input, args) {
	const ext = path.extname(name).toLowerCase();
	const stem = path.basename(name, ext).toLowerCase();
	const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

	if (stem === 'logo') {
		const buf = await sharp(input).rotate().resize({ height: 128 }).png(pngOptions(args)).toBuffer();
		return { outName: 'logo.png', buf, forced: true };
	}
	if (stem === 'thumbnail') {
		const buf = await sharp(input).rotate()
			.resize(128, 128, { fit: args.thumbFit, background: transparent })
			.png(pngOptions(args)).toBuffer();
		return { outName: 'thumbnail.png', buf, forced: true };
	}

	const cap = { width: args.maxWidth, withoutEnlargement: true };
	switch (ext) {
		case '.gif': {
			const gif = args.gifLossless
				? { effort: 7 }
				: { colours: args.gifColours, effort: 7, interFrameMaxError: args.gifFrameError };
			const buf = await sharp(input, { animated: true }).resize(cap).gif(gif).toBuffer();
			return { outName: name, buf };
		}
		case '.png': {
			const buf = await sharp(input).rotate().resize(cap).png(pngOptions(args)).toBuffer();
			return { outName: name, buf };
		}
		case '.jpg':
		case '.jpeg': {
			const buf = await sharp(input).rotate().resize(cap).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
			return { outName: name, buf };
		}
		case '.webp': {
			const buf = await sharp(input, { animated: true }).resize(cap).webp({ quality: 82 }).toBuffer();
			return { outName: name, buf };
		}
		default:
			return null;
	}
}

function kb(n) {
	return (n / 1024).toFixed(1).padStart(8) + ' KB';
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	await fs.mkdir(args.out, { recursive: true });
	const names = (await fs.readdir(args.rawDir, { withFileTypes: true }))
		.filter((e) => e.isFile())
		.map((e) => e.name)
		.sort();
	if (names.length === 0) fail(`no files in ${args.rawDir}`);

	const rows = [];
	let totalBefore = 0;
	let totalAfter = 0;
	for (const name of names) {
		const ext = path.extname(name).toLowerCase();
		if (!IMAGE_EXT.has(ext)) {
			rows.push(`  ${name.padEnd(36)} skipped (not an image)`);
			continue;
		}
		const src = path.join(args.rawDir, name);
		const input = await fs.readFile(src);
		const result = await encode(name, input, args);
		if (!result) {
			rows.push(`  ${name.padEnd(36)} skipped`);
			continue;
		}
		let { outName, buf, forced } = result;
		let note = '';
		if (!forced && buf.length >= input.length) {
			buf = input;
			note = 'kept source (re-encode was not smaller)';
		}
		const meta = await sharp(buf, { animated: true }).metadata();
		const dims = `${meta.width}x${meta.pageHeight || meta.height}`
			+ (meta.pages > 1 ? ` x${meta.pages}f` : '');
		await fs.writeFile(path.join(args.out, outName), buf);
		totalBefore += input.length;
		totalAfter += buf.length;
		const label = outName === name ? name : `${name} -> ${outName}`;
		rows.push(`  ${label.padEnd(36)}${kb(input.length)} ->${kb(buf.length)}  ${dims.padEnd(14)} ${note}`);
	}
	console.log(`prepared ${args.out}`);
	for (const r of rows) console.log(r);
	console.log(`  ${'total'.padEnd(36)}${kb(totalBefore)} ->${kb(totalAfter)}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
