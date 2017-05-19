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

    }])

.directive("circleProgress", function() {
    return {
        template: "<div></div>",
        replace: true,
        scope: {
            color: "@",
            value: "=",
            displayValue: '='
        },
        controller: ["$scope", "$element", "$filter",
            function($scope, $element, $filter) {
                var svg;

                var renderCircle = function(value) {
                    if (value == undefined) {
                        value = $scope.value;
                    }
                    if (!value) {
                        value = $scope.value = 0;
                    }
                    if (svg) {
                        $element.empty();
                    }

                    var displayText = $filter('number')($scope.displayValue);

                    var data = [value, 100 - value];
                    var width = 15 + displayText.length * 8,
                        height = 15 + displayText.length * 8,
                        radius = Math.min(width, height) / 2;
                    var colors = [$scope.color, "#ccc"];

                    var arc = d3.arc().outerRadius(radius).innerRadius(3 * (radius / 4));

                    var pie = d3.pie().sort(null).value(function(d) {
                        return d;
                    });

                    svg = d3
                        .select($element[0])
                        .append("svg")
                        .attr("viewBox", ["0", "0", width, height].join(" "))
                        .append("g")
                        .attr(
                            "transform",
                            "translate(" + width / 2 + "," + height / 2 + ")"
                        );

                        svg.append('text')
                        .attr("text-anchor","middle")
                        .attr("y", 5)
                        .attr("fill", "#666")
                        .text(displayText);

                    var g = svg
                        .selectAll(".arc")
                        .data(pie(data))
                        .enter()
                        .append("g")
                        .attr("class", "arc");

                    g.append("path").attr("d", arc).style("fill", function(d, i) {
                        return colors[i];
                    });
                };

                renderCircle($scope.value);

                $scope.$watch("value", function(n, o) {
                    if (n == undefined || o == undefined) {
                        return;
                    }

                    if (n == o) {
                        renderCircle(n);
                    } else {
                        var step = d3.interpolate(o, n);
                        var start = null;

                        requestAnimationFrame(function restep(tstamp) {
                            if (!start) {
                                start = tstamp;
                            }

                            var perc = step((tstamp - start) / 500);
                            console.log(perc);
                            renderCircle(perc);
                            if (tstamp - start < 500) {
                                requestAnimationFrame(restep);
                            } else {
                                renderCircle(n);
                            }
                        });
                    }
                });
            }
        ]
    };
});
