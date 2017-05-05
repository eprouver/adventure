'use strict';

/**
 * @ngdoc directive
 * @name adventureApp.directive:feedbackBar
 * @description
 * # feedbackBar
 */
angular.module('adventureApp')
    .directive('feedbackBar', function() {
        return {
            template: '<div id="feedback-bar"></div>',
            restrict: 'E',
            replace: true,
            controller: ['$scope', '$element', function($scope, $element) {
                $scope.$on('feedback:page-added', function() {
                    var self = $('<div class="feedback page-added animated bounceInUp alert alert-success"><i class="fa fa-pencil animated tada"></i></div>').css({
                        left: ~~(Math.random() * window.innerWidth * 0.8)
                    });
                    self.on('animationend animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
                        self.removeClass('bounceInUp')
                        self.addClass('fadeOut')
                    })

                    $element.append(self)

                    setTimeout(function(){
                    	self.remove();
                    }, 2000);
                })
            }]
        };
    });
