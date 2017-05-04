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
    .config(function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/library', {
                templateUrl: 'views/library.html',
                controller: 'LibraryCtrl',
                controllerAs: 'library'
            })
            .when('/page/:pageId', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/library'
            });
    })
    .run(['user', function(user){
        user.start();
    }])

    _.mixin({
        guid : function(){
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
          });
        }
      });