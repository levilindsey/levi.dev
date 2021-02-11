const snoringCatDomainIndexRouteRegex = /^.*$/;
const snoringCatPathIndexRouteRegex = /^\/(snoring-cat|snoringcat|snoring-cat-games|snoringcatgames|snoring-cat-llc|snoring|cat|scg)(?:\/.*)?$/;

const supportPathRegex = /^.*\/support.*$/;

let indexFilePath = '/public/index.html';
let supportFilePath = '/public/support.html';

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  indexFilePath = appPath + indexFilePath;
  supportFilePath = appPath + supportFilePath;

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

    if (supportPathRegex.test(req.path)) {
      res.sendFile(supportFilePath);
    } else {
      res.sendFile(indexFilePath);
    }
  }

  // Handles a request for this app.
  function handleSnoringCatPathRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
    }

    if (supportPathRegex.test(req.path)) {
      res.sendFile(supportFilePath);
    } else {
      res.sendFile(indexFilePath);
    }
  }
};
