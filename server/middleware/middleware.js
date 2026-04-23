const config = require('../config/config');

/**
 * @param {Object} server
 */
exports.init = server => {
  const staticFiles = require('./static-files');

  attachCompression(server);
  attachExpressMiddleware(server);
  attachCacheBusterRemover(server);
  attachCrossOriginIsolationHeaders(server);
  staticFiles.init(server);
};

// Gzip / Brotli all responses. Wired BEFORE static-files so the
// large Godot web assets (.wasm, .pck, .js) are compressed on the
// fly. Saves ~30 MB on the kittenbaticorn deploy alone (the side
// module wasm shrinks ~4x; the bootstrap JS shrinks ~5x; the .pck
// gets a smaller bump because it embeds already-compressed assets).
function attachCompression(server) {
  const compression = require('compression');
  // Default `compression` filter handles `application/wasm`,
  // `application/javascript`, etc. via the `compressible` package
  // — covers everything we ship.
  server.use(compression());
}

// Godot's threaded web template requires a cross-origin-isolated
// context so it can use SharedArrayBuffer. Scoped to /kittenbaticorn
// so other apps that embed cross-origin content are unaffected.
function attachCrossOriginIsolationHeaders(server) {
  server.use('/kittenbaticorn', (req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });
}

/**
 * @param {Object} server
 */
function attachExpressMiddleware(server) {
  const config = require('../config/config');
  const morgan = require('morgan'); // For logging
  const favicon = require('serve-favicon'); // For serving our favicon
  const bodyParser = require('body-parser'); // For parsing urlencoded and json request bodies
  const cookieParser = require('cookie-parser');
  const session = require('express-session');

  // Set up the templating engine
  server.set('views', __dirname);
  server.set('view engine', 'jade');

  server.use(morgan('dev', {immediate: true}));
  server.use(favicon(config.app.faviconPath));
  server.use(bodyParser.json());
  server.use(cookieParser());
  server.use(handleError);
}

/**
 * The static files used in this project are re-named within the Lo-Dash templates to enable cache busting. A token is
 * injected just before each URL's filename extension.
 *
 * This function attaches middleware to remove this token, so the server can recognize the original filename.
 *
 * @param {Object} server
 */
function attachCacheBusterRemover(server) {
  server.use((req, res, next) => {
    req.url = req.url.replace(/\/([^\/]+)\.v[\d.\-]+\.(css|js|json|jpg|png|gif|svg|ico|m4a|ogg)$/i, '/$1.$2');
    next();
  });
}

function handleError(error, req, res, next) {
  console.error(error);
  res.status(500).send(error);
}
