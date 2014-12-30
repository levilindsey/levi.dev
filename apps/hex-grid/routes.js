var homeRouteRegex = '/';
var hexGridRouteRegex = /^\/hex-grid(?:\/.*)?$/;

var indexFilePath = '/public/index.html';

// Attaches the route handlers for this app.
exports.attachRoutes = function (server, appPath, config) {
  indexFilePath = appPath + indexFilePath;

  server.get(homeRouteRegex, handleRootRequest);
  server.get(hexGridRouteRegex, handleHexGridRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleRootRequest(req, res, next) {
    res.sendFile(indexFilePath);
  }

  // Handles a request for this app.
  function handleHexGridRequest(req, res, next) {
    var dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.sendFile(indexFilePath);
    } else {
      next();
    }
  }
};
