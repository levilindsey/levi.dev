// This module is important for connecting this app to the server. It exports
// a function, which attaches all of the necessary route handlers for this app.

const ROUTE_REGEX = '*';
const TEMPLATE_FILE = '/templates/index';

let templatePath = null;

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  templatePath = appPath + TEMPLATE_FILE;

  server.all(ROUTE_REGEX, handleRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleRequest(req, res, next) {
    const content = {
      status: 404,
      pageName: req.hostname + req.path,
      portfolioAnalyticsScriptGA4: config.app.portfolioAnalyticsScriptGA4,
      portfolioAnalyticsScriptGA4ID: config.app.portfolioAnalyticsScriptGA4ID
    };
    res.status(404).render(templatePath, content);
  }
};
