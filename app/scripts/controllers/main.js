'use strict';

/**
 * @ngdoc function
 * @name adventureApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adventureApp
 */
angular.module('adventureApp')
    .controller('MainCtrl', ['$scope', '$routeParams', '$timeout', 'user', function($scope, $routeParams, $timeout, user) {
        var self = this;
        self.page = $routeParams.pageId || 0;

        var readyAgain = function() {
            $timeout(function() {
                self.ready = true;
            }, 1000);
        }

        self.hearted = (user.getHearts() || []).indexOf(self.page) > -1;

        $scope.$on('user:updated', function() {
            self.ready = false;
            self.hearted = (user.getHearts() || []).indexOf(self.page) > -1;
            readyAgain();
        })

        readyAgain();

        self.heartPage = function() {
            user.setHeart(self.page);
        }

    }]);
