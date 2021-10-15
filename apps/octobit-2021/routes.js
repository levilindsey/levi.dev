const routeRegex = /^\/(octobit|octobit2021|octobit-2021)(?:\/.*)?$/i;

const twitterSearchUrl = 'https://twitter.com/search?q=(%23Octobit%20OR%20%23Octobit2021)%20(from%3Alevisl)&src=typed_query';

const redirectUrl = twitterSearchUrl;

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
      res.redirect(redirectUrl);
    } else {
      next();
    }
  }
};
