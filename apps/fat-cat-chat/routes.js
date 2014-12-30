// This module is important for connecting this app to the server. It exports
// a function, which attaches all of the necessary route handlers for this app.

var ROUTE_REGEX = /^\/fat-cat-chat(?:\/.*)?$/;

// Attaches the route handlers for this app.
exports.attachRoutes = function (server, appPath, config) {
  server.get(ROUTE_REGEX, handleRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleRequest(req, res, next) {
    var dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.redirect(301, 'http://fat-cat-chat.jit.su/');
    } else {
      next();
    }
  }
};
