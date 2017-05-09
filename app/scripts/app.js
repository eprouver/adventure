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
        'ngTouch',
        'LocalStorageModule'
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
    .run(['$rootScope', 'user', function($rootScope, user) {
        $rootScope.wordSpeed = 500;
        user.start();
    }])
    .config(function(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('adventure-');
    })

_.mixin({
    guid: function(title) {
        if (title.length > 20) {
            title = title.slice(0, 20);
        }
        return encodeURIComponent(title.replace(/[^\w\s]/gi, '').replace(/ /g, '-')) + '-xx-xx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
});
