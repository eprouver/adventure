'use strict';

/**
 * @ngdoc directive
 * @name adventureApp.directive:fitText
 * @description
 * # fitText
 */
angular.module('adventureApp')
    .directive('fitText', function() {
        return {
            template: '<div>{{boundValue}}</div>',
            replace: true,
            restrict: 'E',
            scope: {
                value: '='
            },
            link: function postLink(scope, element, attrs) {

                var resizeFunc = function resizeFunc(n, o) {
                    if (!scope.value || scope.value.length == 0) return;
                    element.css({
                        fontSize: Math.max(Math.min(element.parent().height() / 8, (150 / scope.value.length) * (element.parent().width() / 8000) * 100), element.parent().width() / 20)
                    })

                    element[0].innerHTML = scope.value.trim().replace(/ (?=[^ ]*$)/, "&nbsp;")
                }

                window.addEventListener('resize', resizeFunc)

                scope.$watch('value', resizeFunc)
            }
        };
    });
