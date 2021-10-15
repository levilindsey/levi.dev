const surfacerRouteRegex = /^\/(surfacer|surface|scaffolder|scaffold|squirrel|squirrels|squirrel-away|squirrel_away|exampler)(?:\/.*)?$/i;

const githubUrl = 'https://snoringcatgames.github.io/exampler';

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
      res.redirect(githubUrl);
    } else {
      next();
    }
  }
};
