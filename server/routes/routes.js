exports.attachRoutes = server => {
  const viewRoutes = require('./view-routes');

  viewRoutes.attachRoutes(server);
};
