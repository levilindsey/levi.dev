var routeRegex = /^\/(stuck-in-an-inner-tube|tube-climber|ld47|ludum-dare-47)(?:\/.*)?$/;

var redirectUrl = 'https://levilindsey.github.io/tube-climber';

// Attaches the route handlers for this app.
exports.attachRoutes = function (server, appPath, config) {
  server.get(routeRegex, handleSurfacerRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleSurfacerRequest(req, res, next) {
    var dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.redirect(redirectUrl);
    } else {
      next();
    }
  }
};
