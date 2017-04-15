/**
 * @ngdoc directive
 * @name adventureApp.directive:reader
 * @description
 * # reader
 */
angular.module('adventureApp')
    .directive('reader', ['pages', function(pages) {
        return {
            templateUrl: 'views/reader.html',
            replace: true,
            restrict: 'E',
            controllerAs: 'rCtrl',
            controller: ['$scope', '$element', function($scope, $element) {
                var playing, index, loop, parse, focus, hyphenate, str, words;
                var o = $element.find('#o')[0];
                var self = this;

                pages.getPage($scope.main.page).then(function(page){
                  $scope.page = page;
                  $scope.page.choices.forEach(function(v, i){
                    if(!_.isObject(v)){
                      pages.getPage(v).then(function(v){
                        $scope.page.choices[i] = v;
                      })                      
                    }
                  })

                  $scope.p();
                })

                self.adding = false;

                parse = function(words, str) {

                    hyphenate = function(words, str) {
                        with(words)
                        return length < 8 ? words : length < 11 ? slice(0, length - 3) + '- ' + slice(length - 3) : slice(0, 7) + '- ' + hyphenate(slice(7))
                    }

                    // return 2d array with word and focus point
                    return words.trim().replace(/([.?!])([A-Z-])/g, '$1 $2').split(/\s+/).reduce(function(words, str) {
                        with(str) {
                            // focus point
                            for (j = focus = (length - 1) / 2 | 0; j >= 0; j--)
                                if (/[aeiou]/.test(str[j])) {
                                    focus = j
                                    break
                                }

                            t = 60000 / 500 // 500 wpm

                            if (length > 6)
                                t += t / 4

                            if (~indexOf(','))
                                t += t / 2

                            if (/[.?!]/.test(str))
                                t += t * 1.5

                            return length > 14 || length - focus > 7 ? words.concat(parse(hyphenate(str))) : words.concat([
                                [str, focus, t]
                            ])
                        }
                    }, [])
                }

                $scope.p = function() {
                    self.choosing = false;
                    o.classList.remove('animated');
                    o.classList.remove('fadeOutUp');
                    o.innerHTML = '&nbsp;'

                    index = 0
                    playing = !playing
                    playing && setTimeout(loop, 1000)
                }

                loop = function(words) {
                    words = parse($scope.page.text);

                    w = words[index++] || $scope.p()

                    if (!w) {
                        o.classList.add('animated');
                        o.classList.add('fadeOutUp');

                        setTimeout(function() {
                            self.choosing = true;
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }

                        }, 1000)

                        return;
                    }

                    o.innerHTML = Array(Math.round(((o.getBoundingClientRect().width) / parseInt(window.getComputedStyle(o).fontSize)) * 0.68) - w[1]).join('&nbsp;') + w[0].slice(0, w[1]) + '<v>' + w[0][w[1]] + '</v>' + w[0].slice(w[1] + 1)

                    playing && setTimeout(loop, w[2] * Math.max(6 / index, 1))
                }

            }]
        };
    }]);
