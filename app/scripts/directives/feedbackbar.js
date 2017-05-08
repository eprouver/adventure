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
                function notificationFlag(alertType, icon, iconAnim) {
                    if(!iconAnim) iconAnim = '';
                    var self = $('<div class="feedback animated bounceInUp alert alert-' + alertType + '"><i class="fa fa-' + icon + ' animated ' + iconAnim + '"></i></div>').css({
                        left: 20
                    });
                    self.on('animationend animationend webkitAnimationEnd oanimationend MSAnimationEnd', function() {
                        self.removeClass('bounceInUp')
                        self.addClass('fadeOut')
                    })

                    $element.append(self)

                    setTimeout(function() {
                        self.remove();
                    }, 2000);
                }


                $scope.$on('feedback:page-added', function() {
                    notificationFlag('success', 'pencil', 'tada')
                })

                $scope.$on('feedback:bookmark-added', function() {
                    notificationFlag('success', 'bookmark')
                })

                $scope.$on('feedback:bookmark-removed', function() {
                    notificationFlag('danger', 'bookmark')
                })
            }]
        };
    });
