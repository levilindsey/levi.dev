const snoringCatDomainRouteRegex = /^.*$/;
const snoringCatPathRouteRegex = /^\/(snoring-cat|snoringcat|snoring-cat-games|snoringcatgames|snoring-cat-llc|snoring|cat|scg)(?:\/.*)?$/;

let indexFilePath = '/public/index.html';

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  indexFilePath = appPath + indexFilePath;

  server.get(snoringCatDomainRouteRegex, handleSnoringCatDomainRequest);
  server.get(snoringCatPathRouteRegex, handleSnoringCatPathRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleSnoringCatDomainRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.snoringCatDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    res.sendFile(indexFilePath);
  }

  // Handles a request for this app.
  function handleSnoringCatPathRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
    }

    res.sendFile(indexFilePath);
  }
};
