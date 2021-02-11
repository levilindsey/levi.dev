const snoringCatDomainIndexRouteRegex = /^.*$/;
const snoringCatPathIndexRouteRegex =
    /^\/(snoring-cat|snoringcat|snoring-cat-games|snoringcatgames|snoring-cat-llc|snoring|cat|scg)(?:\/.*)?$/;

const subroutes = [
  {
    // Inner-Tube Climber privacy policy.
    pathRegex: /^.*\/inner-tube-climber\/(privacy-policy|privacy).*$/,
    redirectUrl:
        'https://docs.google.com/document/d/1kH48Xn62wFnZuy8wFmrsr4lKJ-k3wU-MnqFpYdhwBCc/preview',
  },
  {
    // Inner-Tube Climber terms of service.
    pathRegex: /^.*\/inner-tube-climber\/(terms-of-service|terms-and-conditions|tos).*$/,
    redirectUrl:
        'https://docs.google.com/document/d/1g1W4F2nJqJsIPKOwRGlFJi4IGj5q1ae7upYOTnVtfyI/preview',
  },
  {
    // Inner-Tube Climber data-deletion instructions.
    pathRegex: /^.*\/inner-tube-climber\/(data-deletion-instructions|data-deletion).*$/,
    redirectUrl:
        'https://docs.google.com/document/d/1QMl93Ti8aYybPHPmyAFlLnn7U9KyxSzpCI5N50Drqls/preview',
  },
  {
    // Support.
    pathRegex: /^.*\/support.*$/,
    filePath: '/public/support.html',
  },
  {
    // Index.
    pathRegex: /^.*$/,
    filePath: '/public/index.html',
  },
];

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  // Prepend the app path to any sub-route file paths.
  subroutes.forEach(subroute => {
    if (subroute.filePath) {
      subroute.filePath = appPath + subroute.filePath;
    }
  });

  server.get(snoringCatDomainIndexRouteRegex, handleSnoringCatDomainRequest);
  server.get(snoringCatPathIndexRouteRegex, handleSnoringCatPathRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleSnoringCatDomainRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.snoringCatDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    handleSnoringCatPath(req, res, next);
  }

  // Handles a request for this app.
  function handleSnoringCatPathRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
    }

    handleSnoringCatPath(req, res, next);
  }

  function handleSnoringCatPath(req, res, next) {
    for (let subroute of subroutes) {
      if (subroute.pathRegex.test(req.path)) {
        if (subroute.filePath) {
          res.sendFile(subroute.filePath);
        } else if (subroute.redirectUrl) {
          res.redirect(subroute.redirectUrl);
        } else {
          throw new Error('Invalid route config');
        }
        return;
      }
    }
    throw new Error('Invalid route config');
  }
};
