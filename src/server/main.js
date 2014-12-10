/**
 * @module app
 *
 * This script instantiates the server and begins listening for requests.
 */

var config = require('./config/config');

init().listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

/**
 * Sets up the server.
 */
function init() {
  var server = require('express')(),
      middleware = require('./middleware/middleware'),
      routes = require('./routes/routes');

  middleware.init(server);
  routes.init(server);

  return server;
}
