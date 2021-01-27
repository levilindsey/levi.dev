/**
 * @module app
 *
 * This script instantiates the server and begins listening for requests.
 */

const config = require('./config/config');

init().then((server) => {
  if (config.environment === 'development') {
    // Specifying an address of '0.0.0.0' allows us to access the server from any computer on the local network
    server.listen(config.app.port, '0.0.0.0', () => {
      console.log('Express server listening over the local network on port ' + config.app.port);
    });
  } else {
    server.listen(config.app.port, () => {
      console.log('Express server listening on port ' + config.app.port);
    });
  }
}).catch((error) => {
  console.error('Unable to start server: ' + error);
  process.exit(1);
});

/**
 * Sets up the server.
 */
function init() {
  const deferred = require('q').defer();
  const server = require('express')();
  const middleware = require('./middleware/middleware');
  const routes = require('./routes/routes');

  middleware.init(server);
  routes.attachRoutes(server);

  deferred.resolve(server);

  return deferred.promise;
}
