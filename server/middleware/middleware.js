const config = require('../config/config');

/**
 * @param {Object} server
 */
exports.init = server => {
  const staticFiles = require('./static-files');

  attachExpressMiddleware(server);
  attachCacheBusterRemover(server);
  staticFiles.init(server);
};

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
