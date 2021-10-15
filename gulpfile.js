// TODO: split this apart into separate files for each task within the gulp directory

const config = {};

config.appsPath = 'apps';
config.serverPath = 'server';

config.templatesSrc = config.appsPath + '/*/*.html';

config.templatesDist = config.appsPath;

config.serverMainPath = './' + config.serverPath + '/main.js';

// ---  --- //

config.portfolioAnalyticsScript =
    "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
      "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
      "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
    "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');" +
    "ga('create', 'UA-43971205-4', 'auto');" +
    "ga('set', 'anonymizeIp', true);" +
    "ga('send', 'pageview');";

config.snoringCatAnalyticsScript =
    "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
      "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
      "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
    "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');" +
    "ga('create', 'UA-43971205-9', 'auto');" +
    "ga('set', 'anonymizeIp', true);" +
    "ga('send', 'pageview');";

// ---  --- //

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('templates', () => {
  return gulp.src(config.templatesSrc)
      .pipe(plugins.plumber())
      .pipe(plugins.template({
        portfolioAnalyticsScript: config.portfolioAnalyticsScript,
        snoringCatAnalyticsScript: config.snoringCatAnalyticsScript,
      }))
      .pipe(plugins.rename(path => {
        path.dirname += '/public';
      }))
      .pipe(gulp.dest(config.templatesDist));
});

gulp.task('bump', () => {
  return gulp.src(['./bower.json', './package.json'])
      .pipe(plugins.plumber())
      .pipe(plugins.bump({type: 'patch'})) // 'major'|'minor'|'patch'|'prerelease'
      .pipe(gulp.dest('./'));
});

gulp.task('server', () => {
  require(config.serverMainPath);
});

gulp.task('default', () => {
  gulp.start('server', 'templates');
});
