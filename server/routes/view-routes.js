var fs = require('fs'),
    config = require('../config/config');

exports.attachRoutes = function (server) {
  console.log('Attaching view-route handlers');

  config.app.apps.forEach(function (appName) {
    if (appName !== 'hex-grid' && appName !== 'page-missing') {
      attachRoutesForApp(server, config.app.appsPath + '/' + appName);
    }
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
  var appName, routeName, indexFilePath, appUsesServerSideTemplating;

  appName = appPath.split('/').pop();

//  routeName = '/' + appName;
  routeName = new RegExp('^\/' + appName + '(?:\/.*)?$');

  appUsesServerSideTemplating = checkWhetherAppUsesServerSideTemplating(appPath);
  indexFilePath = appUsesServerSideTemplating ? appPath + '/templates/index' : appPath + '/public/index.html';

//  server.route(routeName).get(handleRequest);
  server.get(routeName, handleRequest);

  // ---  --- //

  // Handles a request for this app
  function handleRequest(req, res, next) {
    var content;

    if (appUsesServerSideTemplating) {
      content = {};
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
