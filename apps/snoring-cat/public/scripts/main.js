'use strict';

/**
 * @module main
 */
(function () {
  window.addEventListener('load', init);

  function init() {
    // console.log('onDocumentLoad');

    window.removeEventListener('load', init);
  }

  // console.log('main module loaded');
})();
