const routeRegex = /^\/(meteor(-?power)?)(?:\/.*)?$/i;

const androidRegex = /(\bandroid\b)/i;
const iosRegex = /(\bmac os\b|\bios\b|\biphone\b|\bipad\b|\bipod\b)/i;

const githubPagesUrl = 'https://snoringcatgames.github.io/meteor_power/';
const itchioUrl = 'https://levilindsey.itch.io/meteor-power';
// TODO: Add app marketplace links after publishing mobile apps.
const androidStoreUrl = 'https://play.google.com/store/apps/details?id=dev.levi.meteor_power';
const iosStoreUrl = 'https://apps.apple.com/us/app/meteor-power/TODO';

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
      // TODO: Update redirect after publishing mobile apps.
      res.redirect(githubPagesUrl);
      // const redirectUrl = iosRegex.test(req.get('User-Agent')) ? iosStoreUrl : androidStoreUrl;
      // res.vary('User-Agent');
      // res.redirect(redirectUrl);
    } else {
      next();
    }
  }
};
