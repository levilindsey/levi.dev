const routeRegex = /^\/(todo-ggj-game-name-here|(ggj|global-?game-?jam)-?(2022|22)?)(?:\/.*)?$/i;

const githubPagesUrl = 'https://voithos.github.io/global-game-jam-2022';
// TODO:
const itchioUrl = '';
const redirectUrl = githubPagesUrl;

// Attaches the route handlers for this app.
exports.attachRoutes = (server, appPath, config) => {
    server.get(routeRegex, handleRequest);

    // ---  --- //

    // Handles a request for this app.
    function handleRequest(req, res, next) {
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
