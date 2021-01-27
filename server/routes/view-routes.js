const fs = require('fs');
const config = require('../config/config');

exports.attachRoutes = server => {
  console.log('Attaching view-route handlers');

  config.app.apps.forEach(appName => {
    if (appName !== 'hex-grid' &&
        appName !== 'page-missing' &&
        appName !== 'sitemap.xml') {
      attachRoutesForApp(server, config.app.appsPath + '/' + appName);
    }
  });

  server.get(new RegExp('^\/sitemap\.xml$'), (req, res, next) => {
    res.sendFile(config.app.sitemapPath);
  });

  attachRoutesForApp(server, config.app.homePath);
  attachRoutesForApp(server, config.app.pageMissingPath);
};

function attachRoutesForApp(server, appPath) {
  try {
    require(appPath + '/routes').attachRoutes(server, appPath, config);

    console.log('Using custom route logic for app at ' + appPath);
  } catch (error) {
    attachDefaultRouteForApp(server, appPath);

    console.log('Using default route logic for app at ' + appPath);
  }
}

/**
 * Attaches a default route for the given app. This could either use templating with Jade or serve a static index.html
 * file, depending on the setup of the app.
 *
 * @param {Object} server
 * @param {string} appPath
 */
function attachDefaultRouteForApp(server, appPath) {
  const appName = appPath.split('/').pop();

//  routeName = '/' + appName;
  const routeName = new RegExp('^\/' + appName + '(?:\/.*)?$');

  const appUsesServerSideTemplating = checkWhetherAppUsesServerSideTemplating(appPath);
  const indexFilePath = appUsesServerSideTemplating ?
      appPath + '/templates/index' :
      appPath + '/public/index.html';

//  server.route(routeName).get(handleRequest);
  server.get(routeName, handleRequest);

  // ---  --- //

  // Handles a request for this app
  function handleRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    if (appUsesServerSideTemplating) {
      const content = {};
      res.render(indexFilePath, content);
    } else {
      res.sendFile(indexFilePath);
    }
  }

  function checkWhetherAppUsesServerSideTemplating(appPath) {
    try {
      fs.openSync(appPath + '/index.html', 'r');
      return false;
    } catch (error) {
      return true;
    }
  }
}
