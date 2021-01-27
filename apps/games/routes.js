const gamesDomainRouteRegex = /^.*$/;
const gamesPathRouteRegex = /^\/(games)(?:\/.*)?$/;

let indexFilePath = '/public/index.html';

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  indexFilePath = appPath + indexFilePath;

  server.get(gamesDomainRouteRegex, handleGamesDomainRequest);
  server.get(gamesPathRouteRegex, handleGamesPathRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleGamesDomainRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.gamesDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    res.sendFile(indexFilePath);
  }

  // Handles a request for this app.
  function handleGamesPathRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
    }

    res.sendFile(indexFilePath);
  }
};
