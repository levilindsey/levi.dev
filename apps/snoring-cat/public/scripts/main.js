'use strict';

/**
 * This module defines a singleton that drives the app.
 *
 * @module main
 */
(function () {
  var CARD_OPEN_DURATION = 200;

  window.addEventListener('load', init);

  // ---  --- //

  /**
   * This is the event handler for the completion of the DOM loading. This initializes the app.
   */
  function init() {
    console.log('onDocumentLoad');

    window.removeEventListener('load', init);

    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
      var cardHeaders = card.querySelectorAll('.card-header-wrapper');
      var cardBodies = card.querySelectorAll('.card-body-wrapper');
      if (cardHeaders.length !== 1 || cardBodies.length !== 1) {
        console.error('Invalid card structure');
      }
      cardHeaders[0].addEventListener('click', onHeaderClick.bind(null, card));
    });
  }

  function onHeaderClick(card) {
    card.classList.add('transitioning');
    if (card.classList.contains('open')) {
      card.classList.remove('open');
    } else {
      card.classList.add('open');
    }
    setTimeout(function () {
      card.classList.remove('transitioning');
    }, CARD_OPEN_DURATION);
  }

  console.log('main module loaded');
})();
