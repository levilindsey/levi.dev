#!/usr/bin/env node
// Backdate every file under apps/kittenbaticorn/public/ to the
// LD59 jam submission window. Express's serve-static derives both
// the `Last-Modified` response header and the `Etag` from each
// file's mtime, so touching them here makes the deployed files
// appear to have been built just before the deadline.
//
// Wired in via the `heroku-postbuild` npm script so it runs once
// per Heroku slug compile, after files are extracted from git but
// before the dyno starts.
//
// Target: Sunday April 19, 2026 16:30:00 PST (UTC-8)
//       = Monday April 20, 2026 00:30:00 UTC.

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(REPO_ROOT, 'apps', 'kittenbaticorn', 'public');
const TARGET_TIME = new Date(Date.UTC(2026, 3, 20, 0, 30, 0));

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function main() {
  if (!fs.existsSync(TARGET_DIR)) {
    console.warn(
      '[touch-kittenbaticorn] target dir not found, skipping: ' + TARGET_DIR
    );
    return;
  }
  const files = walk(TARGET_DIR);
  let touched = 0;
  for (const f of files) {
    try {
      fs.utimesSync(f, TARGET_TIME, TARGET_TIME);
      touched++;
    } catch (err) {
      console.warn(
        '[touch-kittenbaticorn] failed to touch ' + f + ': ' + err.message
      );
    }
  }
  console.log(
    '[touch-kittenbaticorn] backdated ' + touched + ' files to ' +
    TARGET_TIME.toISOString() + ' (' + TARGET_DIR + ')'
  );
}

main();
