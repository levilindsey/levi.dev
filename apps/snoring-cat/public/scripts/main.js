'use strict';

/**
 * This module defines a singleton that drives the app.
 *
 * @module main
 */
(function () {

  window.addEventListener('load', init, false);

  // ---  --- //

  /**
   * This is the event handler for the completion of the DOM loading. This initializes the app.
   */
  function init() {
    console.log('onDocumentLoad');

    window.removeEventListener('load', init);

    var dashboard = document.querySelector('#dashboard');
  }

  console.log('main module loaded');
})();
