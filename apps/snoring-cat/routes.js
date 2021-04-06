const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const snoringCatDomainIndexRouteRegex = /^.*$/;
const snoringCatPathIndexRouteRegex =
    /^\/(snoring-cat|snoringcat|snoring-cat-games|snoringcatgames|snoring-cat-llc|snoring|cat|scg)(?:\/.*)?$/;

const supportRegex = /^.*\/support.*$/;
const logGesturesRegex = /^.*\/log\/gestures.*$/;

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
    // Inner-Tube Climber.
    pathRegex: /^.*\/inner-tube-climber.*$/,
    redirectUrl:
        'https://www.snoringcat.games/#inner-tube-climber',
  },
  {
    // Squirrel Away privacy policy.
    pathRegex: /^.*\/squirrel-away\/(privacy-policy|privacy).*$/,
    redirectUrl:
        'https://docs.google.com/document/d/12uDeI0x2osKE9Vev8Bbdgir3if93jXA48C_ayWLtan8/preview',
  },
  {
    // Squirrel Away terms of service.
    pathRegex: /^.*\/squirrel-away\/(terms-of-service|terms-and-conditions|tos).*$/,
    redirectUrl:
        'https://docs.google.com/document/d/1Xe5r5C8kTJUlmwKBaOTM23F6TGodvNdmwHISGfWH_n0/preview',
  },
  {
    // Squirrel Away.
    pathRegex: /^.*\/squirrel-away.*$/,
    redirectUrl:
        'https://www.snoringcat.games/#squirrel-away',
  },
  {
    // Dark Time.
    pathRegex: /^.*\/dark-time.*$/,
    redirectUrl:
        'https://www.snoringcat.games/#dark-time',
  },
  {
    // About.
    pathRegex: /^.*\/about.*$/,
    redirectUrl:
        'https://www.snoringcat.games/#about',
  },
  {
    // Contact.
    pathRegex: /^.*\/contact.*$/,
    redirectUrl:
        'https://www.snoringcat.games/#contact',
  },
  {
    // Support.
    pathRegex: supportRegex,
    filePath: '/public/support.html',
  },
  {
    // Log gestures.
    pathRegex: logGesturesRegex,
    responseText: 'Gestures successfully recorded',
  },
  {
    // Index.
    pathRegex: /^.*$/,
    filePath: '/public/index.html',
  },
];

const dataDeletionRequestKey = 'request-data-deletion';

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
  server.post(snoringCatDomainIndexRouteRegex, handleSnoringCatDomainRequest);
  server.post(snoringCatPathIndexRouteRegex, handleSnoringCatPathRequest);

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

  async function handleSnoringCatPath(req, res, next) {
    if (req.query.hasOwnProperty(dataDeletionRequestKey) && supportRegex.test(req.path)) {
      await sendDataDeletionRequestEmail(req);
    } else if (logGesturesRegex.test(req.path)) {
      await sendLogGesturesEmail(req);
    }

    for (let subroute of subroutes) {
      if (subroute.pathRegex.test(req.path)) {
        if (subroute.filePath) {
          res.sendFile(subroute.filePath);
        } else if (subroute.redirectUrl) {
          res.redirect(subroute.redirectUrl);
        } else if (subroute.responseText) {
          res.send(subroute.responseText);
        } else {
          throw new Error('Invalid route config');
        }
        return;
      }
    }
    throw new Error('Invalid route config');
  }

  async function sendDataDeletionRequestEmail(req) {
    // The user is requesting data deletion.
    // Send an email notification to follow-up.

    const subject =
        'DATA DELETION REQUEST' +
        ': client-id=' + req.query['client-id'] +
        '; source=' + req.query['source'] +
        '; app=' + req.query['app'];

    const body =
        'A user has requested that their data be deleted.' +
        '\n\n-   Now follow-up with Google Analytics to delete all data with the corresponding client ID (' + req.query['client-id'] + ').' +
        '\n-   If the user sends an additional email from the support page, then send them a confirmation email once Google has deleted their data.' +
        '\n\nhttps://support.google.com/analytics/answer/9450800?hl=en';

    const message = {
      from: 'snoringcat@snoringcat.games',
      to: 'support@snoringcat.games',
      subject: subject,
      text: body,
    };

    try {
      await sgMail.send(message);
      console.log('Mail sent');
    } catch (e) {
      console.error('Mail failed to send!', e);
    }
  }

  async function sendLogGesturesEmail(req) {
    // The user has sent gesture information for debugging.
    // Send an email with this information.

    const subject =
        'GESTURE LOGS FOR DEBUGGING' +
        ': source=' + req.query['source'] +
        '; app=' + req.query['app'];

    let body;
    try {
      body = JSON.stringify(req.body);
    } catch (e) {
      throw new Error('Request body is not JSON')
    }

    const message = {
      from: 'snoringcat@snoringcat.games',
      to: 'support@snoringcat.games',
      subject: subject,
      text: body,
    };

    await sgMail.send(message);
    console.log('Mail sent');
  }
};
