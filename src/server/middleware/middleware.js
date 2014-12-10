/**
 * @module middleware
 *
 * Sets up middleware functionality for the server.
 */

var config = require('../config/config');

/**
 * Sets up middleware for the server.
 *
 * @param {Object} server
 */
exports.init = function (server) {
  var staticFiles = require('./static-files');

  // Set up the templating engine
  server.set('views', __dirname);
  server.set('view engine', 'jade');

  staticFiles.init(server);
};
