/**
 * @module app
 *
 * This script instantiates the server and begins listening for requests.
 */

var config = require('./config/config');

init().then(function (server) {
  if (config.environment === 'development') {
    // Specifying an address of '0.0.0.0' allows us to access the server from any computer on the local network
    server.listen(config.app.port, '0.0.0.0', function () {
      console.log('Express server listening over the local network on port ' + config.app.port);
    });
  } else {
    server.listen(config.app.port, function () {
      console.log('Express server listening on port ' + config.app.port);
    });
  }
}).catch(function (error) {
  console.error('Unable to start server: ' + error);
  process.exit(1);
});

/**
 * Sets up the server.
 */
function init() {
  var deferred = require('q').defer(),
      server = require('express')(),
      db = require('./database/db'),
      middleware = require('./middleware/middleware'),
      routes = require('./routes/routes'),
      config = require('./config/config');

  // TODO: add database support on NodeJitsu
//  db.init();
  middleware.init(server);
  routes.attachRoutes(server);

  // Clean up some system state for development and testing
  if (config.environment === 'development') {
    // TODO: add in test data
    deferred.resolve(server);
//    db.clear()
//        .then(function () {
//          deferred.resolve(server);
//        })
//        .catch(function (error) {
//          deferred.reject(error);
//        });
  } else {
    deferred.resolve(server);
  }

  return deferred.promise;
}
