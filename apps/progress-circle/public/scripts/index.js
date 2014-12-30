/**
 * This static module drives the app.
 * @module index
 */
(function () {

  var params, util, log, animate, ProgressCircle, progressCircle;

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Initializes this app.
   * @function index~init
   */
  function init() {
    params = app.params;
    util = app.util;
    app.Log.initStaticFields();
    log = new app.Log('index');

    log.d('init');

    util.init();

    util.listen(window, 'load', onDocumentLoad);
  }

  /**
   * Resets all of the state for this app.
   * @function index~reset
   */
  function reset() {
    var body, container;

    animate = app.animate;
    ProgressCircle = app.ProgressCircle;

    animate.init();
    ProgressCircle.initStaticFields();

    log.i('reset', 'All modules initialized');

    body = document.getElementsByTagName('body')[0];
    container = util.createElement('div', body, 'container', null);
    progressCircle =
        new ProgressCircle(container, params.PROGRESS_CIRCLE.CONTAINER_SIDE_LENGTH,
            params.PROGRESS_CIRCLE.DIAMETER, params.PROGRESS_CIRCLE.DOT_RADIUS, true);
    progressCircle.open();
  }

  /**
   * This is the event handler for the completion of the DOM loading.
   * @function index~onDocumentLoad
   */
  function onDocumentLoad() {
    log.i('onDocumentLoad');

    reset();
  }

  // ------------------------------------------------------------------------------------------- //

  if (!window.app) window.app = {};

  console.log('index module loaded');

  init();
})();
