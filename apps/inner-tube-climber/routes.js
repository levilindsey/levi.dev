const routeRegex = /^\/(inner-tube-climber)(?:\/.*)?$/i;

const androidRegex = /(\bandroid\b)/i;
const iosRegex = /(\bmac os\b|\bios\b|\biphone\b|\bipad\b|\bipod\b)/i;

const itchioUrl = 'https://levilindsey.itch.io/stuck-in-an-inner-tube';
const androidStoreUrl = 'https://play.google.com/store/apps/details?id=dev.levi.inner_tube_climber';
const iosStoreUrl = 'https://apps.apple.com/us/app/inner-tube-climber/id1553158659';

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
      const redirectUrl = iosRegex.test(req.get('User-Agent')) ? iosStoreUrl : androidStoreUrl;
      res.vary('User-Agent');
      res.redirect(redirectUrl);
    } else {
      next();
    }
  }
};
