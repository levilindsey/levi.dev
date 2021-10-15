const homeRouteRegex = '/';
const hexGridRouteRegex = /^\/hex-grid(?:\/.*)?$/;

let indexFilePath = '/public/index.html';

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  indexFilePath = appPath + indexFilePath;

  server.get(homeRouteRegex, handleRootRequest);
  server.get(hexGridRouteRegex, handleHexGridRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleRootRequest(req, res, next) {
    console.log('req.hostname:' + req.hostname);
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    res.sendFile(indexFilePath);
  }

  // Handles a request for this app.
  function handleHexGridRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    const dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.sendFile(indexFilePath);
    } else {
      next();
    }
  }
};
