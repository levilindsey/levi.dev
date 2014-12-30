// This module is important for connecting this app to the server. It exports a function, which attaches all of the
// necessary route handlers for this app.

var weddingPhotosRouteRegex = /^\/wedding\/photos(?:\/.*)?$/;
var inviteRouteRegex = /^\/wedding(?:\/.*)?$/;
var photoViewerRouteRegex = /^\/photo-viewer(?:\/.*)?$/;

var inviteTemplatePath = null;
var photoViewerTemplatePath = null;

// Attaches the route handlers for this app.
exports.attachRoutes = function (server, appPath, config) {
  inviteTemplatePath = appPath + '/templates/invite-index';
  photoViewerTemplatePath = appPath + '/public/photos-index.html';

  server.get(weddingPhotosRouteRegex, handlePhotoViewerRequest);
  server.get(photoViewerRouteRegex, handlePhotoViewerRequest);
  server.get(inviteRouteRegex, handleInviteRequest);

  // ---  --- //

  // Handles a request for the photo-viewer app.
  function handlePhotoViewerRequest(req, res, next) {
    res.sendFile(photoViewerTemplatePath);
  }

  // Handles a request for the invite app.
  function handleInviteRequest(req, res, next) {
    var content, dirs;

    dirs = req.path.split('/');

    if (dirs[2] === 'invite' && dirs[3] === '' && dirs.length === 4 ||
        (dirs[2] === '' || dirs[2] === 'invite') && dirs.length === 3 ||
        dirs.length === 2) {
      content = {
        analyticsScript: config.app.analyticsScript
      };
      res.render(inviteTemplatePath, content);
    } else {
      next();
    }
  }
};
