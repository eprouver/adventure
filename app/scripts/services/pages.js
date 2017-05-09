'use strict';

/**
 * @ngdoc service
 * @name adventureApp.pages
 * @description
 * # pages
 * Service in the adventureApp.
 */
angular.module('adventureApp')
    .service('pages', ['$http', '$q', '$rootScope', 'user', 'localStorageService', function($http, $q, $rootScope, user, localStorageService) {
        var database = firebase.database();
        var loadedPages = {};

        var sanitizePages = function(pages) {
            _(pages).forEach(function(v) {
                if (!v.hasOwnProperty('choices')) {
                    v.choices = [];
                }

                if (loadedPages[v.id]) {
                    for (var key in v) {
                        loadedPages[v.id][key] = v[key]
                    }
                } else {
                    loadedPages[v.id] = v;
                }
            });

        }

        function init() {
            database.ref('pages').orderByChild('parent').equalTo(null).limitToFirst(10).on('value', _.debounce(function(res) {
                sanitizePages(res.val());
                $rootScope.$broadcast('pages:updated');
            }, 500))

            database.ref('pages').orderByChild('creationDate').limitToFirst(10).on('value', _.debounce(function(res) {
                sanitizePages(res.val());
                $rootScope.$broadcast('pages:updated');
            }, 500))

            database.ref('pages').orderByChild('viewCount').limitToFirst(10).on('value', _.debounce(function(res) {
                sanitizePages(res.val());
                $rootScope.$broadcast('pages:updated');
            }, 500))

            database.ref('pages').orderByChild('bookSize').limitToFirst(10).on('value', _.debounce(function(res) {
                sanitizePages(res.val());
                $rootScope.$broadcast('pages:updated');
            }, 500))

            var userData = user.getData()
            if(userData.loaded){
              firebase.database().ref('pages').orderByChild('author').equalTo(userData.uid).limitToFirst(10).on('value', _.debounce(function(res) {
                sanitizePages(res.val());
                $rootScope.$broadcast('pages:updated');
            }, 500))               
            }

        }

        $rootScope.$on('user:updated', init);
        init();

        function fakePage(id, choices) {
            return $http.get('http://www.randomtext.me/api/gibberish/p-1/15-25').then(function(res) {
                if (choices) {
                    if (!res.data) {
                        res.data.text_out = 'sample text';
                    }

                    return {
                        id: id,
                        loaded: true,
                        text: res.data.text_out.replace(/(<([^>]+)>)/ig, ""),
                        action: 'Action: + ' + id,
                        choices: []
                    }
                } else {
                    return {
                        id: id,
                        loaded: false,
                        action: 'Action: + ' + id
                    }
                }
            })
        }

        return {
            newStory: function(title) {
                var defer = $q.defer();

                defer.resolve(_.guid(title));
                return defer.promise;
            },
            getStories: function() {
                return _(loadedPages).toArray().filter(function(v) {
                    return !v.parent;
                })
            },
            getPagesByAuthor: function(uid){
                return _(loadedPages).toArray().filter(function(v) {
                    return v.author == uid;
                })
            },
            incrementViewCount: function(pageId) {
                var pagesRead = localStorageService.get('pagesRead');
                if (!pagesRead) {
                    pagesRead = [];
                }

                if (pagesRead.indexOf(pageId) > -1) {
                    return;
                }

                pagesRead.push(pageId);
                localStorageService.set('pagesRead', pagesRead.slice(0, 50));

                //Increment viewCount;
                var databaseRef = database.ref('pages').child(pageId).child('viewCount');

                databaseRef.transaction(function(viewCount) {

                    if (!viewCount) viewCount = 0;

                    viewCount = viewCount + 1;

                    return viewCount;
                });
            },
            submitPage: function(story, parent, data) {
                var defer = $q.defer();

                var page = {
                    id: parent ? _.guid(data.action) : story,
                    parent: parent,
                    story: story,
                    action: data.action,
                    text: data.text,
                    viewCount: 0,
                    author: user.getData().uid,
                    creationDate: new Date().getTime(),
                    choices: []
                };

                if (data.endMeme) {
                    page.memeBackground = data.memeBackground;
                    page.topMeme = data.topMeme;
                    page.bottomMeme = data.bottomMeme;
                }

                if (story == page.id) {
                    page.bookSize = 1;
                }

                firebase.database().ref('pages/' + page.id).set(page);

                if (parent) {

                    loadedPages[parent].choices.push(page);
                    var transfer = angular.copy(loadedPages[parent]);
                    transfer.choices = transfer.choices.map(function(v) {
                        return {
                            id: v.id,
                            action: v.action
                        }
                    })
                    firebase.database().ref('pages/' + parent).set(transfer);

                    //Increment parent book size;
                    var databaseRef = database.ref('pages').child(page.story).child('bookSize');

                    databaseRef.transaction(function(bookSize) {

                        if (!bookSize) { bookSize = 1; }
                        bookSize += 1;

                        return bookSize;
                    });
                }


                loadedPages[page.id] = page;

                $rootScope.$broadcast('feedback:page-added')

                defer.resolve(page);

                return defer.promise;

            },
            getPage: function(n) {
                var self = this;
                var defer = $q.defer();

                if (loadedPages[n]) {
                    defer.resolve(loadedPages[n]);
                } else {
                    var page = firebase.database().ref('pages/' + n);
                    page.on('value', function(snapshot) {
                        if (!snapshot.val()) {
                            defer.reject('page not found');
                            return;
                        }
                        loadedPages[n] = snapshot.val();
                        if (!loadedPages[n].choices) {
                            loadedPages[n].choices = [];
                        }
                        $rootScope.$broadcast('pages:updated');
                        defer.resolve(loadedPages[n]);
                    });

                }

                return defer.promise;

            }
        }

    }]);
