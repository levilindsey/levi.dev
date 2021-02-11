'use strict';

/**
 * @module main
 */
(function () {

  window.addEventListener('load', init, false);

  // ---  --- //

  function init() {
    console.log('onDocumentLoad');

    window.removeEventListener('load', init);

    var dashboard = document.querySelector('#dashboard');
  }

  console.log('main module loaded');
})();
