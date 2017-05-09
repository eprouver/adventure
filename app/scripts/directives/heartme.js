'use strict';

/**
 * @ngdoc directive
 * @name adventureApp.directive:heartMe
 * @description
 * # heartMe
 */
angular.module('adventureApp')
    .directive("heartMe", [function() {
        return {
            template: '<div class="heart-holder" ng-click="hearted = !hearted" ng-class="{\'hearted\': hearted, \'animated\': animate}"><i class="fa fa-heart top-heart"></i></div>',
            replace: true,
            scope: {
                hearted: '=',
                animate: '='
            },
            link: function(scope, element) {
                scope.$watch('hearted', function(n, o) {
                    //if(!element.hasClass('animated')) return;
                    if(!scope.animate) return;

                    if (n !== o) {
                        if (!scope.hearted) {
                            scope.removeHeart();
                        } else {
                            scope.addHeart();
                        }
                    }
                })
            },
            controller: [
                "$scope",
                "$element",
                function($scope, $element) {

                    var colors = ["#53bf53", "#409ae6", "#31c2ec", "#aeaeae", "#FFFFFF", "#f7cf48", "#FF568E"];

                    $scope.removeHeart = function() {
                        var heart = $element.children(".top-heart")[0];

                        var numHearts = 3;
                        Array.apply(null, Array(numHearts)).forEach(function(v, i) {
                            setTimeout(function() {

                                var faller = document.createElement("i");
                                faller.classList.add("fa");
                                faller.classList.add("fa-tint");
                                faller.classList.add('animated');
                                faller.classList.add('fadeOutDown');
                                faller.classList.add('faller');
                                faller.style.left = 0.5 + (Math.random() * 1 - 0.5) + 'em';

                                $element.append(faller);

                                setTimeout(function() {
                                    $element[0].removeChild(faller);
                                }, 1000);
                            }, 1000 * (i / numHearts));

                        })
                    }

                    $scope.addHeart = function() {
                        var heart = $element.children(".top-heart")[0];
                        heart.classList.add("animated");
                        heart.classList.add("rubberBand");

                        setTimeout(function() {
                            heart.classList.remove("animated");
                            heart.classList.remove("rubberBand");
                            setTimeout(function() {
                                heart.classList.add("animated");
                                heart.classList.add("flip");
                                setTimeout(function() {
                                    heart.classList.remove("animated");
                                    heart.classList.remove("flip");
                                }, 1000);
                            }, 700);
                        }, 1000);

                        var numHearts = 17;
                        var rotatoes = [];

                        Array.apply(null, Array(numHearts)).forEach(function(v, i) {
                            setTimeout(function() {
                                var rotate = 360 * (i / numHearts);
                                var heartHolder = document.createElement("div");
                                heartHolder.classList.add("anim-heart-holder");
                                heartHolder.style.transform = "rotate(" + rotate + "deg)";
                                heartHolder.style.color =
                                    colors[~~(Math.random() * colors.length)];

                                var rotateHolder = document.createElement("div");

                                rotateHolder.classList.add("animated");
                                rotateHolder.classList.add('rotate-holder');
                                rotateHolder.classList.add(
                                    i % 2 == 1 ? "fadeInLeft" : "fadeInRight"
                                );

                                var derotate = document.createElement("div");
                                derotate.style.transform = "rotate(" + -rotate + "deg)";
                                var adder = document.createElement("i");
                                adder.classList.add("fa");
                                adder.classList.add("fa-heart-o");

                                derotate.appendChild(adder);
                                rotateHolder.appendChild(derotate);
                                heartHolder.appendChild(rotateHolder);

                                $element.append(heartHolder);
                                rotatoes.push(rotateHolder);

                                setTimeout(function() {
                                    //$element[0].removeChild(heartHolder);
                                    rotateHolder.classList.remove("animated");

                                }, 1000);
                            }, 1000 * (i / numHearts));

                            setTimeout(function() {
                                rotatoes.forEach(function(v) {

                                    if (v.classList.contains('fadeInLeft')) {
                                        v.classList.remove('fadeInLeft');
                                        v.classList.add('fadeOutRight');
                                    } else {
                                        v.classList.remove('fadeInRight');
                                        v.classList.add('fadeOutLeft');
                                    }
                                    v.style.animationDuration = ~~(Math.random() * 2000) + 'ms';
                                    v.classList.add('animated');
                                })

                                setTimeout(function() {
                                    rotatoes.forEach(function(v) {
                                        if (v.parentNode.parentNode) {
                                            v.parentNode.parentNode.removeChild(v.parentNode);
                                        }
                                    });
                                }, 2200)
                            }, 2200)
                        });
                    };
                }
            ]
        };
    }]);
