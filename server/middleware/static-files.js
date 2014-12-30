var config = require('../config/config');

exports.init = function (server) {
  setUpStaticFiles(server);
};

function setUpStaticFiles(server) {
  var serveStatic, mountPath, staticPath;

  serveStatic = require('serve-static'); // For serving static files

  config.app.apps.forEach(function (appName) {
    setUpStaticFilesForApp(appName, server, serveStatic);
  });

  // Set up static files for Bower
  mountPath = '/bower_components';
  staticPath = config.app.bowerComponentsPath;
  server.use(mountPath, serveStatic(staticPath, {maxAge: config.app.cacheMaxAge}));
  console.log('Serving static files: staticPath=' + staticPath + ', mountPath=' + mountPath);
}

function setUpStaticFilesForApp(appName, server, serveStatic) {
  var mountPath, staticPath;

  mountPath = '/' + appName;
  staticPath = config.app.appsPath + '/' + appName + '/public';
  server.use(mountPath, serveStatic(staticPath, {maxAge: config.app.cacheMaxAge}));
  console.log('Serving static files: staticPath=' + staticPath + ', mountPath=' + mountPath);
}
