const config = require('../config/config');

exports.init = server => {
  setUpStaticFiles(server);
};

function setUpStaticFiles(server) {
  const serveStatic = require('serve-static'); // For serving static files

  config.app.apps.forEach(appName => {
    setUpStaticFilesForApp(appName, server, serveStatic);
  });

  // Set up static files for Bower
  const mountPath = '/bower_components';
  const staticPath = config.app.bowerComponentsPath;
  server.use(mountPath, serveStatic(staticPath, {maxAge: config.app.cacheMaxAge}));
  console.log('Serving static files: staticPath=' + staticPath + ', mountPath=' + mountPath);
}

function setUpStaticFilesForApp(appName, server, serveStatic) {
  const mountPath = '/' + appName;
  const staticPath = config.app.appsPath + '/' + appName + '/public';
  server.use(mountPath, serveStatic(staticPath, {maxAge: config.app.cacheMaxAge}));
  console.log('Serving static files: staticPath=' + staticPath + ', mountPath=' + mountPath);
}
