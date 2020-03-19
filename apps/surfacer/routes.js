var surfacerRouteRegex = /^\/surfacer(?:\/.*)?$/;

var surfacerRedirectUrl = 'https://levilindsey.github.io/surfacer';

// Attaches the route handlers for this app.
exports.attachRoutes = function (server, appPath, config) {
  server.get(surfacerRouteRegex, handleSurfacerRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleSurfacerRequest(req, res, next) {
    var dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.redirect(surfacerRedirectUrl);
    } else {
      next();
    }
  }
};