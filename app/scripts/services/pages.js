'use strict';

/**
 * @ngdoc service
 * @name adventureApp.pages
 * @description
 * # pages
 * Service in the adventureApp.
 */
angular.module('adventureApp')
    .service('pages', ['$http', '$q', function($http, $q) {
        var database = firebase.database();
        var loadedPages = {
            // 0: {
            //     id: 0,
            //     loaded: true,
            //     text: 'I start a new story',
            //     action: 'Choose Me',
            //     choices: []
            // }
        };

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
                            // choices: _.map(new Array(4), function() {
                            // 	  return ~~(Math.random() * 20);
                            // })
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
            submitPage: function(parent, action, text) {
                var defer = $q.defer();

                setTimeout(function() {
                    var page = {
                        id: _.guid(),
                        parent: parent,
                        action: action,
                        text: text,
                        choices: []
                    };

                    firebase.database().ref('pages/' + page.id).set(page);

                    loadedPages[parent].choices.push(page);
                    loadedPages[page.id] = page;

                    defer.resolve(page);
                }, 1000);

                return defer.promise;

            },
            getPage: function(n) {
                var self = this;
                var defer = $q.defer();

                    if (loadedPages[n]) {
                        defer.resolve(loadedPages[n]);
                    } else {
                        // fakePage(n, true).then(function(res) {
                        //     loadedPages[n] = res;
                        //     defer.resolve(loadedPages[n]);
                        // })

                	var page = firebase.database().ref('pages/' + n);
                	page.on('value', function(snapshot) {
                		debugger;
                	});

                    }

                return defer.promise;

            }
        }

    }]);
