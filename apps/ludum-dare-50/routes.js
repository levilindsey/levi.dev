const routeRegex = /^\/(ld50|ludum-?dare-?50)(?:\/.*)?$/i;

const githubPagesUrl = 'https://levilindsey.github.io/ludum-dare-50/';

const demoUrl = githubPagesUrl;

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
      res.redirect(demoUrl);
    } else {
      next();
    }
  }
};
