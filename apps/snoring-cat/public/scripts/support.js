'use strict';

/**
 * @module main
 */
(function () {
  var supportEmailUrlBase = 'mailto:support@snoringcat.games';

  window.addEventListener('load', init, false);

  function init() {
    // console.log('onDocumentLoad');

    window.removeEventListener('load', init);

    var source = getParameterByName('source');
    var app = getParameterByName('app');
    var clientId = getParameterByName('client-id');
    var requestDataDeletion = getParameterByName('request-data-deletion');

    var standardEmailBlock = document.querySelector('#standard-support-email');
    var dataDeletionRequestEmailBlock = document.querySelector('#data-deletion-request-email');
    if (requestDataDeletion !== null) {
      standardEmailBlock.style.display = 'none';
      dataDeletionRequestEmailBlock.style.display = 'block';
    } else {
      standardEmailBlock.style.display = 'block';
      dataDeletionRequestEmailBlock.style.display = 'none';
    }

    var subject = '';
    if (!!source) {
      subject = 'source%3D' + encodeURIComponent(source);
      if (!!app) {
        subject += '%3B app%3D' + encodeURIComponent(app);
        if (requestDataDeletion !== null) {
          subject = 'REQUESTING DATA DELETION%3A ' + subject;
          if (clientId) {
            subject += '%3B client-id%3D' + encodeURIComponent(clientId);
          }
        }
      }
      subject = '?subject=' + subject
    }
    var body = !!subject ? '&body=(Don\'t alter the email subject! It contains important information for us to be able to process your email.)' : '';
    var supportEmailUrl = supportEmailUrlBase + subject + body;

    var supportLink = document.querySelector('#support-link');
    supportLink.href = supportEmailUrl;
  }

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) {
      return null;
    } else if (!results[2]) {
      return '';
    } else {
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  }

  // console.log('support module loaded');
})();
