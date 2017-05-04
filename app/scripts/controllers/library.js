'use strict';

/**
 * @ngdoc function
 * @name adventureApp.controller:LibraryCtrl
 * @description
 * # LibraryCtrl
 * Controller of the adventureApp
 */
angular.module('adventureApp')
    .controller('LibraryCtrl', ['$scope', 'pages', function($scope, pages) {
        var self = this;

        $scope.$on('pages:updated', function() {
            $scope.stories = pages.getStories();
            if(!$scope.$$phase){
            	$scope.$apply();
            }
        })
        $scope.stories = pages.getStories();

        $scope.$on('addChoice:success', function(){
        	self.writing = false;
        })
    }]);
