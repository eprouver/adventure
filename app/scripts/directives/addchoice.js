'use strict';

/**
 * @ngdoc directive
 * @name adventureApp.directive:addChoice
 * @description
 * # addChoice
 */
angular.module('adventureApp')
    .directive('addChoice', ['pages', function(pages) {
        return {
            templateUrl: 'views/addchoice.html',
            replace: true,
            restrict: 'E',
            controller: ['$scope', '$attrs', function($scope, $attrs) {
                $scope.story = $attrs.story;

                function submitPage(story, parent){
                    pages.submitPage(story, parent, $scope.action, $scope.text).then(function(res) {
                        if($scope.rCtrl){
                            $scope.rCtrl.adding = false;
                        }
                        $scope.action = $scope.text = undefined;
                        $scope.sending = false;
                    })                    
                }

                $scope.addChoice = function() {
                    $scope.sending = true;
                    if ($scope.main) {
                        var parent = $scope.main.page;
                    } else {
                        var parent = null;
                    }

                    if($scope.story){
                        pages.newStory().then(function(story){
                            submitPage(story, parent);
                        })
                    }else{
                        submitPage($scope.main.story, parent);
                    }


                }
            }]
        };
    }]);
