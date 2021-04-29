const redirects = [
  // Github
  {
    routeRegex: /^\/(github)(?:\/.*)?$/i,
    redirectUrl: 'https://github.com/levilindsey',
  },
  // Facebook
  {
    routeRegex: /^\/(facebook)(?:\/.*)?$/i,
    redirectUrl: 'https://facebook.com/levislindsey',
  },
  // Twitter
  {
    routeRegex: /^\/(twitter)(?:\/.*)?$/i,
    redirectUrl: 'https://twitter.com/levisl',
  },
  // LinkedIn
  {
    routeRegex: /^\/(linkedin)(?:\/.*)?$/i,
    redirectUrl: 'https://linkedin.com/in/levi-lindsey',
  },
  // Youtube
  {
    routeRegex: /^\/(youtube)(?:\/.*)?$/i,
    redirectUrl: 'https://www.youtube.com/playlist?list=PLIuJN99AFOPSF3p4f0siFo22XiMXqijQU',
  },
  // itch.io
  {
    routeRegex: /^\/(itch|itchio|itch\.io)(?:\/.*)?$/i,
    redirectUrl: 'https://levilindsey.itch.io/',
  },
  // Ludum Dare
  {
    routeRegex: /^\/(ludum-dare|ludumdare|ld|ldjam|game-jam)(?:\/.*)?$/i,
    redirectUrl: 'https://ldjam.com/users/ukulelefury/games',
  },
  // Blog
  {
    routeRegex: /^\/(blog|devlog)(?:\/.*)?$/i,
    redirectUrl: 'https://devlog.levi.dev',
  },
  // Resume
  {
    routeRegex: /^\/(resume|cv)(?:\/.*)?$/i,
    redirectUrl: 'https://docs.google.com/document/d/1RKgxLzazYLZiIJq_sJpmKtBDtCvaEdlgs_rUBd-ZZyk/preview#',
  },
];

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
  for (const redirect of redirects) {
    server.get(redirect.routeRegex, handleRequest.bind(null, redirect.redirectUrl));
  }

  // ---  --- //

  // Handles a request for this app.
  function handleRequest(redirectUrl, req, res, next) {
    // Check whether this request was directed to the portfolio.
    if (config.portfolioDomains.indexOf(req.hostname) < 0) {
      next();
      return;
    }

    const dirs = req.path.split('/');

    if (dirs[2] === '' || dirs.length === 2) {
      res.redirect(redirectUrl);
    } else {
      next();
    }
  }
};
