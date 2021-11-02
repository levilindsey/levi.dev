const routeRegex = /^\/(ai|ai-?movement|ai-series|platformer-ai|platformer-ai-series|pathfinding|platformer-pathfinding)(?:\/.*)?$/i;

const mainPostUrl = 'https://devlog.levi.dev/2021/09/building-platformer-ai-from-low-level.html';

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  server.get(routeRegex, handleRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    const dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.redirect(mainPostUrl);
    } else {
      next();
    }
  }
};
