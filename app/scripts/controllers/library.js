'use strict';

/**
 * @ngdoc function
 * @name adventureApp.controller:LibraryCtrl
 * @description
 * # LibraryCtrl
 * Controller of the adventureApp
 */
angular.module('adventureApp')
    .controller('LibraryCtrl', ['$scope', '$rootScope', 'pages', 'localStorageService', 'user',
        function($scope, $rootScope, pages, localStorageService, user) {
            var self = this;

            $scope.params = {
                sectionLength: 5
            }

            var bookmark = localStorageService.get('bookmark');
            if (bookmark) {
                pages.getPage(bookmark).then(function(page) {
                    self.bookmark = angular.copy(page);
                    pages.getPage(page.story).then(function(story) {
                        self.bookmark.story = story;
                    })
                }, function() {
                    localStorageService.set('bookmark', null)
                })
            }

            $scope.removeBookmark = function() {
                localStorageService.set('bookmark', null);
                self.bookmark = null;
                $rootScope.$broadcast('feedback:bookmark-removed');
            };

            var getMyStories = function() {
                var userData = user.getData();

                if (userData.loaded) {
                    $scope.myPages = pages.getPagesByAuthor(userData.uid);
                }

            }

            var getRandomStories = function() {
                if ($scope.stories.length > $scope.params.sectionLength) {
                    $scope.randomStories = _.sample($scope.stories, $scope.params.sectionLength);
                } else {
                    $scope.randomStories = $scope.stories;
                }
            }

            $scope.$on('pages:updated', function() {
                $scope.stories = pages.getStories();

                getMyStories();
                getRandomStories();

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            })

            $scope.stories = pages.getStories();
            getRandomStories();
            getMyStories();

            $scope.$on('addChoice:success', function() {
                self.writing = false;
            });
            $scope.$on('addChoice:close', function() {
                self.writing = false;
            });

            (function review() {
                var back = document.getElementById("back-svg");

                if (!back) return;

                back.classList.remove("fadeIn");
                back.classList.add("fadeOut");

                setTimeout(function() {
                    back.classList.remove("fadeOut");
                    var x = ~~(Math.random() * 500);
                    var y = ~~(Math.random() * 300);
                    var w = ~~(Math.random() * 140);
                    var h = ~~(Math.random() * 180);
                    back.setAttribute("viewBox", [x, y, x + w, y + h].join(" "));
                    back.classList.remove("hide");
                    back.classList.add("animated");
                    back.classList.add("fadeIn");

                    setTimeout(review, 10000);
                }, 1000);
            })();
        }
    ]);
