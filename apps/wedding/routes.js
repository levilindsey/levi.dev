// This module is important for connecting this app to the server. It exports a function, which attaches all of the
// necessary route handlers for this app.

const weddingPhotosRouteRegex = /^\/wedding\/photos(?:\/.*)?$/;
const inviteRouteRegex = /^\/wedding(?:\/.*)?$/;
const photoViewerRouteRegex = /^\/photo-viewer(?:\/.*)?$/;

let inviteTemplatePath = null;
let photoViewerTemplatePath = null;

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  inviteTemplatePath = appPath + '/templates/invite-index';
  photoViewerTemplatePath = appPath + '/public/photos-index.html';

  server.get(weddingPhotosRouteRegex, handlePhotoViewerRequest);
  server.get(photoViewerRouteRegex, handlePhotoViewerRequest);
  server.get(inviteRouteRegex, handleInviteRequest);

  // ---  --- //

  // Handles a request for the photo-viewer app.
  function handlePhotoViewerRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    res.sendFile(photoViewerTemplatePath);
  }

  // Handles a request for the invite app.
  function handleInviteRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    const dirs = req.path.split('/');

    if (dirs[2] === 'invite' && dirs[3] === '' && dirs.length === 4 ||
        (dirs[2] === '' || dirs[2] === 'invite') && dirs.length === 3 ||
        dirs.length === 2) {
      const content = {
        analyticsScript: config.app.analyticsScript
      };
      res.render(inviteTemplatePath, content);
    } else {
      next();
    }
  }
};
