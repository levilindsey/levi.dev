/**
 * @module config
 *
 * Holds server-side configuration data for the app.
 */

// Translate the relative project root path to an absolute path for the current file system
var projectRoot = require('path').resolve(__dirname + '/../../..');

var config = {};

config.port = process.env.PORT || 3000;

// Locations of some important files
config.publicPath = projectRoot + '/src/public';
config.viewsPath = projectRoot + '/src/server/views';
config.indexPath = config.publicPath + '/index.html';
config.pageMissingPath = config.viewsPath + '/404.jade';

module.exports = config;
