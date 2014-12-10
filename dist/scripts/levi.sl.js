'use strict';

angular.module('levislApp', [
  // Third-party libraries
  'ui.router',

  // As part of the build process, all partials are automatically added the angular template cache
  'templates',

  // Helpers
  'constants',
  'routes',
//  'someFilter',
//  'someService',

  // Components
  'svgIconDirectives',
  'toastDirectives',

  // Models
  'dataNameService',
  'userService',

  // Routes
  'homeController'
])

    .run(function ($rootScope) {
      $rootScope.routeState = {};

      // TODO:
    });

angular.module('constants', [])

    .constant('appName', 'levi.sl');

angular.module('routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home');

      $stateProvider
          .state('home', {
            url: '/home',
            templateUrl: 'routes/home/home.html',
            controller: 'HomeCtrl'
          });
    })

    .run(function ($rootScope) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState,
                                                    fromParams) {
        console.debug('$stateChangeStart', toState.name);

        $rootScope.routeState.stateName = toState.name;
      });

      $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        console.error('$stateNotFound', unfoundState.name);
      });

      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState,
                                                      fromParams) {
        console.debug('$stateChangeSuccess', toState.name);
      });

      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState,
                                                    fromParams, error) {
        console.error('$stateChangeError', toState.name, error);
      });

      $rootScope.$on('$viewContentLoading', function (event) {
        console.debug('$viewContentLoading');
      });

      $rootScope.$on('$viewContentLoaded', function (event) {
        console.debug('$viewContentLoaded');
      });
    });

angular.module('dataNameService', [])

    .constant('someDataUrl', '/some-data-url')

    .factory('DataName', function($http, someDataUrl) {
      var DataName;

      DataName = {
        getData: function (parameters) {
          return $http.get(someDataUrl + '/')
              .then(function (response) {
                return JSON.parse(response.data);
              })
              .catch(function (error) {
                console.error(error);
              });
        }
      };

      return DataName;
    });

angular.module('userService', [])

    .constant('someUserUrl', '/some-user-url')

    .factory('User', function($http, someUserUrl) {
      var User;

      User = {
        getData: function (parameters) {
          return $http.get(someUserUrl + '/')
              .then(function (response) {
                return JSON.parse(response.data);
              })
              .catch(function (error) {
                console.error(error);
              });
        }
      };

      return User;
    });

angular.module('svgIconDirectives', [])

    .directive('svgIcon', function () {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          name: '@'
        },
        templateUrl: 'components/svg-icon/svg-icon.html',
        link: function (scope, element, attrs) {
          scope.svgId = '#svg-icon-' + scope.name;
        }
      };
    });

angular.module('toastDirectives', [])

    .directive('toast', function ($timeout) {
      var toastTransitionDuration = 300;

      return {
        restrict: 'E',
        scope: {
          text: '@',
          width: '@',
          duration: '@'
        },
        templateUrl: 'components/toast/toast.html',
        link: function (scope, element, attrs) {
          var duration = parseInt(scope.duration);

          element.css('width', scope.width + 'px');

          // Fade the toast in
          // The CSS transition needs to start shortly after the element has been added to the DOM
          $timeout(function () {
            element.addClass('shown');
          }, 10);

          // Fade the toast out
          $timeout(function () {
            element.removeClass('shown');
          }, duration);

          // Remove the toast from the DOM
          $timeout(function () {
            element.remove();
          }, duration * 2 + toastTransitionDuration);
        }
      };
    });

angular.module('toastService', [])

    .factory('Toast', function($rootScope, $compile) {
      var Toast;

      var rootElement = angular.element(document.querySelector('[ng-app]'));

      var defaultWidth = 200;
      var defaultDuration = 2400;
      var topPosition = 20;

      /**
       * @param {string} text
       * @param {number} width
       * @param {number} duration
       */
      function compileToast(text, width, duration) {
        var template = '<toast text="' + text + '" width="' + width + '" duration="' + duration +
            '"></toast>';
        var element = angular.element(template);
        return $compile(element)($rootScope);
      }

      /**
       * @param {string} text
       * @param {number} [width=300]
       * @param {number} [duration=2400]
       */
      function addToast(text, width, duration) {
        var element;

        width = width || defaultWidth;
        duration = duration || defaultDuration;

        element = compileToast(text, width, duration);
        rootElement.append(element);
        element.css('top', topPosition + 'px');
      }

      function notYetImplemented() {
        addToast('Not yet implemented');
      }

      Toast = {
        toast: addToast,
        notYetImplemented: notYetImplemented
      };

      return Toast;
    });

angular.module('homeController', [])

    .controller('HomeCtrl', function ($scope, appName) {
      $scope.homeState = {};
      $scope.homeState.appName = appName;
    });
