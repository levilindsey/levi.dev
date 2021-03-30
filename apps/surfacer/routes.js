const surfacerRouteRegex = /^\/(surfacer|squirrel|squirrels|squirrel-away)(?:\/.*)?$/;

const surfacerRedirectUrl = 'https://snoringcatgames.github.io/squirrel-away';

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  server.get(surfacerRouteRegex, handleSurfacerRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleSurfacerRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    const dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.redirect(surfacerRedirectUrl);
    } else {
      next();
    }
  }
};
