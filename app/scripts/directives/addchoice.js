'use strict';

/**
 * @ngdoc directive
 * @name adventureApp.directive:addChoice
 * @description
 * # addChoice
 */
angular.module('adventureApp')
  .directive('addChoice', ['pages', function (pages) {
    return {
      templateUrl: 'views/addchoice.html',
      replace:true,
      restrict: 'E',
      controller: ['$scope', function($scope){
      	$scope.addChoice = function(){
      		$scope.sending = true;
      		pages.submitPage($scope.main.page, $scope.action, $scope.text).then(function(res){
      			$scope.rCtrl.adding = false;
      			$scope.action = $scope.text = undefined;
      			$scope.sending = false;
      		})
      	}
      }]
    };
  }]);
