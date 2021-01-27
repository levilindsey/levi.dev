// This module is important for connecting this app to the server. It exports
// a function, which attaches all of the necessary route handlers for this app.

const ROUTE_REGEX = /^\/fat-cat-chat(?:\/.*)?$/;

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  server.get(ROUTE_REGEX, handleRequest);

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
      res.redirect(301, 'https://fat-cat-chat.herokuapp.com/');
    } else {
      next();
    }
  }
};
