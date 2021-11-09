const rootRouteRegex = /^\/(octobit(-?2021)?|art|pixel-?art|pixels?)(?:\/.*)?$/i;
const twitterRouteRegex = /^\/(octobit(-?2021)?-?twitter)(?:\/.*)?$/i;
const timelapseRouteRegex = /^\/(octobit(-?2021)?-?time-?lapses?)(?:\/.*)?$/i;
const videoRouteRegex = /^\/(octobit(-?2021)?-?video)(?:\/.*)?$/i;

const twitterSearchUrl = 'https://twitter.com/search?q=(%23Octobit%20OR%20%23Octobit2021)%20(from%3Alevisl)&src=typed_query';
const portfolioUrl = 'https://levi.dev/#octobit-2021';
const timelapseUrl = 'https://www.youtube.com/playlist?list=PLIuJN99AFOPR6PIdddURuBwMQeWC4VeH5';
const compositeVideoUrl = 'https://www.youtube.com/watch?v=eZ1hoM2edDM';

const rootUrl = portfolioUrl;

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  server.get(timelapseRouteRegex, handleTimelapseRequest);
  server.get(videoRouteRegex, handleVideoRequest);
  server.get(twitterRouteRegex, handleTwitterRequest);
  server.get(rootRouteRegex, handleRootRequest);

  // ---  --- //

  // Handles a request for this app.
  function handleRootRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    const dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.redirect(rootUrl);
    } else {
      next();
    }
  }

  // Handles a request for this app.
  function handleTimelapseRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    const dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.redirect(timelapseUrl);
    } else {
      next();
    }
  }

  // Handles a request for this app.
  function handleVideoRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    const dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.redirect(compositeVideoUrl);
    } else {
      next();
    }
  }

  // Handles a request for this app.
  function handleTwitterRequest(req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    const dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.redirect(twitterSearchUrl);
    } else {
      next();
    }
  }
};
