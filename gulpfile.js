// TODO: split this apart into separate files for each task within the gulp directory

var config = {};

config.appsPath = 'apps';
config.serverPath = 'server';

config.templatesSrc = config.appsPath + '/*/*index.html';
config.frontEndTestsSrc = config.appsPath + '/**/*_test.js';
config.serverTestsSrc = config.serverPath + '/tests/**/*_test.js';

config.templatesDist = config.appsPath;

config.serverMainPath = './' + config.serverPath + '/main.js';

// ---  --- //

config.analyticsScript =
    "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
      "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
      "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
    "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');" +
    "ga('create', 'UA-43971205-1', 'jackieandlevi.com');" +
    "ga('send', 'pageview');";

// ---  --- //

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('templates', function () {
  return gulp.src(config.templatesSrc)
      .pipe(plugins.plumber())
      .pipe(plugins.template({analyticsScript: config.analyticsScript}))
      .pipe(plugins.rename(function (path) {
        path.dirname += '/public';
      }))
      .pipe(gulp.dest(config.templatesDist));
});

gulp.task('tests-once', ['server-tests-once', 'front-end-tests-once']);

gulp.task('server-tests-once', function () {
  return gulp.src(config.serverTestsSrc, {read: false})
      .pipe(plugins.plumber())
      .pipe(plugins.mocha({reporter: 'dot', ui: 'tdd'}));
});

gulp.task('front-end-tests-once', function () {
  return gulp.src(config.frontEndTestsSrc)
      .pipe(plugins.plumber())
      .pipe(plugins.karma({configFile: 'karma.conf.js', action: 'run'}));
});

gulp.task('bump', function () {
  return gulp.src(['./bower.json', './package.json'])
      .pipe(plugins.plumber())
      .pipe(plugins.bump({type: 'patch'})) // 'major'|'minor'|'patch'|'prerelease'
      .pipe(gulp.dest('./'));
});

gulp.task('server', function () {
  require(config.serverMainPath);
});

gulp.task('default', function () {
  gulp.start('server', 'templates', 'tests-once');
});
