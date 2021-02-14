'use strict';

/**
 * @module shared
 */
(function () {
  var CARD_OPEN_DURATION = 200;

  var path = location.pathname;
  while (path.length > 0 && path[path.length - 1] === '/') {
    path = path.substr(0, path.length - 1);
  }

  var openCard = null;

  window.addEventListener('load', init);

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

    openCardMatchingHash();
  }

  function onHeaderClick(card) {
    card.classList.add('transitioning');
    if (card.classList.contains('open')) {
      openCard = null;
      card.classList.remove('open');
      history.pushState({}, document.title, path + '/');
    } else {
      if (!!openCard) {
        openCard.classList.remove('open');
      }
      openCard = card;
      card.classList.add('open');
      history.pushState({}, document.title, path + '#' + card.id);
    }
    setTimeout(function () {
      card.classList.remove('transitioning');
    }, CARD_OPEN_DURATION);
  }

  function openCardMatchingHash() {
    if (location.hash.length > 1) {
      var cardId = location.hash.substr(1);
      var matchingCard = document.querySelector('#' + cardId + '.card');
      if (!!matchingCard) {
        matchingCard.classList.add('open');
      }
    }
  }

  console.log('shared module loaded');
})();
