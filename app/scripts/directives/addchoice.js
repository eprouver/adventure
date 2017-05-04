'use strict';

/**
 * @ngdoc directive
 * @name adventureApp.directive:addChoice
 * @description
 * # addChoice
 */
angular.module('adventureApp')
    .directive('addChoice', ['$rootScope', 'pages', 'user', function($rootScope, pages, user) {
        return {
            templateUrl: 'views/addchoice.html',
            replace: true,
            restrict: 'E',
            controllerAs: 'acCtrl',
            controller: ['$scope', '$attrs', function($scope, $attrs) {
                var self = this;
                $scope.story = $attrs.story;
                $scope.user = user.getData();
                $scope.params = {
                    maxTitle: 100,
                    maxPage: 520
                }

                $scope.$on('user:updated', function(){
                    $scope.user = user.getData();
                    if(!$scope.$$phase){
                        $scope.$apply();
                    }
                })

                if(!$scope.user.loaded){
                    setTimeout(user.showButtons, 100);
                }

                function submitPage(story, parent){
                    return pages.submitPage(story, parent, self.action, self.text).then(function(res) {
                        if($scope.rCtrl){
                            $scope.rCtrl.adding = false;
                        }
                        self.action = self.text = undefined;
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

                    var choiceSuccess = function(){
                        $rootScope.$broadcast('addChoice:success')
                    }

                    if($scope.story){
                        pages.newStory().then(function(story){
                            submitPage(story, parent).then(choiceSuccess);
                        })
                    }else{
                        submitPage($scope.page.story, parent).then(choiceSuccess);
                    }

                }
            }]
        };
    }]);
