const routeRegex = /^\/(momma-duck|mama-duck|mamma-duck|duck|duckling|ducks|ducklings|gmtk-2021|gmtk-21|gmtk2021|gmtk21)(?:\/.*)?$/i;

// TODO: Rename this directory.
// TODO: Add more route matches.
// TODO: Add itch URL, and switch to use it.

const githubUrl = 'https://levilindsey.github.io/gmtk-2021';
const itchioUrl = 'https://levilindsey.itch.io/momma-duck';
const demoUrl = itchioUrl;

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