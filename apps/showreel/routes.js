const routeRegex = /^\/((game(play)?)?-?show-?reel)(?:\/.*)?$/i;

const youtubeUrl = 'https://www.youtube.com/watch?v=VKTejiouFJk';
const portfolioUrl = 'https://levi.dev#showreel';

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
      res.redirect(portfolioUrl);
    } else {
      next();
    }
  }
};
