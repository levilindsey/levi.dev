'use strict';

/**
 * @module shared
 */
(function () {
  var CARD_OPEN_DURATION = 200;

  var path = location.pathname;
  var queryParams = location.search;
  while (path.length > 0 && path[path.length - 1] === '/') {
    path = path.substr(0, path.length - 1);
  }

  var mainContainer = null;
  var catIcon = null;
  var openCard = null;

  window.addEventListener('load', init);

  function init() {
    // console.log('onDocumentLoad');

    window.removeEventListener('load', init);

    mainContainer = document.querySelector('#main');
    catIcon = document.querySelector('#cat');

    var cards = document.querySelectorAll('.card');
    for (var card of cards) {
      var cardHeaders = card.querySelectorAll('.card-header-wrapper');
      var cardBodies = card.querySelectorAll('.card-body-wrapper');
      if (cardHeaders.length !== 1 || cardBodies.length !== 1) {
        console.error('Invalid card structure');
      }
      cardHeaders[0].addEventListener('click', onHeaderClick.bind(null, card));
    }

    openInitialCardMatchingHash();

    mainContainer.style.display = 'flex';
    setTimeout(function () {
      mainContainer.style.visibility = 'visible';
    }, 40);
  }

  function onHeaderClick(card) {
    card.classList.add('transitioning');
    if (card.classList.contains('open')) {
      openCard = null;
      card.classList.remove('open');
      mainContainer.classList.remove('card-opened');
      history.pushState({}, document.title, path + '/' + queryParams);
    } else {
      if (!!openCard) {
        openCard.classList.remove('open');
      }
      openCard = card;
      card.classList.add('open');
      mainContainer.classList.add('card-opened');
      history.pushState({}, document.title, path + '#' + card.id + queryParams);
    }
    setTimeout(function () {
      card.classList.remove('transitioning');
    }, CARD_OPEN_DURATION);
  }

  function openInitialCardMatchingHash() {
    if (location.hash.length > 1) {
      var cardId = location.hash.substr(1);
      if (cardId.indexOf('?') >= 0) {
        cardId = cardId.substr(0, cardId.indexOf('?'));
      }
      var matchingCard = document.querySelector('#' + cardId + '.card');
      if (!!matchingCard) {
        // Move the auto-focused card to the top of the list.
        var parentElement = matchingCard.parentElement;
        parentElement.removeChild(matchingCard);
        parentElement.insertBefore(matchingCard, parentElement.childNodes[0]);

        openCard = matchingCard;
        matchingCard.classList.add('open');
        mainContainer.classList.add('initial-transition');
        mainContainer.classList.add('card-opened');
        setTimeout(function () {
          mainContainer.classList.remove('initial-transition');
        }, 10);

        matchingCard.scrollIntoView();
        setTimeout(function () {
          matchingCard.scrollIntoView();
        }, 10);
      }
    }
  }

  // console.log('shared module loaded');
})();
