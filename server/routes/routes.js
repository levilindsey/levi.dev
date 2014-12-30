exports.attachRoutes = function (server) {
  var viewRoutes = require('./view-routes');

  viewRoutes.attachRoutes(server);
};
