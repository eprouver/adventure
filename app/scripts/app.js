'use strict';

/**
 * @ngdoc overview
 * @name adventureApp
 * @description
 * # adventureApp
 *
 * Main module of the application.
 */
angular
  .module('adventureApp', [
    'ngAnimate',
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/page/:pageId', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/library', {
        templateUrl: 'views/library.html',
        controller: 'LibraryCtrl',
        controllerAs: 'library'
      })
      .otherwise({
        redirectTo: '/library'
      });
  });
