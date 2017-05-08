/**
 * @ngdoc directive
 * @name adventureApp.directive:reader
 * @description
 * # reader
 */
angular.module('adventureApp')
    .directive('reader', ['$rootScope', 'pages', 'localStorageService', function($rootScope, pages, localStorageService) {
        return {
            templateUrl: 'views/reader.html',
            replace: true,
            restrict: 'E',
            controllerAs: 'rCtrl',
            controller: ['$scope', '$element', function($scope, $element) {
                var playing, index, loop, parse, focus, hyphenate, str, words;
                var o = $element.find('#o')[0];
                var self = this;

                self.params = {
                    choiceLimit: 8
                }

                self.bookmark = localStorageService.get('bookmark');
                self.addBookmark = function(remove) {
                    if (remove) {
                        self.bookmark = null;
                        localStorageService.set('bookmark', null);
                        $rootScope.$broadcast('feedback:bookmark-removed');
                        return;
                    }
                    self.bookmark = $scope.page.id;
                    localStorageService.set('bookmark', self.bookmark);
                    $rootScope.$broadcast('feedback:bookmark-added');
                }

                $scope.progress = 0;


                var loadPage = function() {
                    return pages.getPage($scope.main.page).then(function(page) {
                        $scope.page = page;
                        $scope.page.choices.forEach(function(v, i) {
                            if (!_.isObject(v)) {
                                pages.getPage(v).then(function(v) {
                                    $scope.page.choices[i] = v;
                                })
                            }
                        })

                        if ($scope.page.memeBackground) {
                            $scope.memeImage = new Image();
                            $scope.memeImage.onload = function() {
                                $scope.page.memeLoaded = true;
                            }
                            $scope.memeImage.src = $scope.page.memeBackground;
                        }
                    })
                }

                $scope.readingFinished = function() {
                    self.choosing = true;
                    pages.incrementViewCount($scope.page.id);
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }

                    if ($('#sharing-holder').hasClass('hide')) {
                        $('#sharing-holder').removeClass('hide');
                        pages.getPage($scope.page.story).then(function(story) {
                            socialshares.configure({
                                title: 'Help expand this story!',
                                description: '"' + story.action + '"',
                                text: '"' + story.action + '"'
                            })

                            socialshares.mount() // render with new config
                        })
                    }

                };

                self.adding = false;

                parse = function(words, str) {

                    hyphenate = function(words, str) {
                        return words.length < 8 ? words : words.length < 11 ? words.slice(0, words.length - 3) + '- ' + words.slice(words.length - 3) : words.slice(0, 7) + '- ' + hyphenate(words.slice(7))
                    }

                    // return 2d array with word and focus point
                    return words.trim().replace(/([.?!])([A-Z-])/g, '$1 $2').split(/\s+/).reduce(function(words, str) {

                        // focus point
                        for (var j = focus = (str.length - 1) / 2 | 0; j >= 0; j--)
                            if (/[aeiou]/.test(str[j])) {
                                focus = j
                                break
                            }

                        var t = 60000 / $rootScope.wordSpeed // 500 wpm

                        if (str.length > 6)
                            t += t / 4

                        if (~str.indexOf(','))
                            t += t / 2

                        if (/[.?!]/.test(str))
                            t += t * 1.5

                        return str.length > 14 || str.length - focus > 7 ? words.concat(parse(hyphenate(str))) : words.concat([
                            [str, focus, t]
                        ])

                    }, [])
                }

                loop = function(words) {
                    words = parse($scope.page.text);

                    var w = words[index++] || $scope.p();
                    $scope.$apply(function() {
                        $scope.progress = (index / words.length) * 100;
                    })

                    if (!w) {
                        o.parentNode.classList.add('animated');
                        o.parentNode.classList.add('fadeOutUp');


                            //Reading Finished;
                            if ($scope.page.memeBackground) {
                                $scope.$apply(function() {
                                    $scope.readingMeme = true;
                                });
                            } else {
                                setTimeout($scope.readingFinished, 1000)
                            }
    

                        return;
                    }

                    o.innerHTML = Array(Math.round(((o.getBoundingClientRect().width) / parseInt(window.getComputedStyle(o).fontSize)) * 0.68) - w[1]).join('&nbsp;') + w[0].slice(0, w[1]) + '<v>' + w[0][w[1]] + '</v>' + w[0].slice(w[1] + 1)
                    playing && setTimeout(loop, w[2] * Math.max(6 / index, 1))
                }

                $scope.p = function() {
                    self.choosing = false;
                    self.adding = false;
                    o.parentNode.classList.remove('animated');
                    o.parentNode.classList.remove('fadeOutUp');
                    $scope.readingMeme = false;
                    o.innerHTML = '&nbsp;'

                    index = 0
                    playing = !playing
                    playing && setTimeout(loop, 1000)
                }

                $scope.$on('addChoice:success', loadPage);
                $scope.$on('pages:updated', loadPage);
                $scope.$on('addChoice:close', function() {
                    self.adding = false;
                })

                loadPage().then($scope.p);

            }]
        };
    }]);
