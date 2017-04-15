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
        // AngularJS will instantiate a singleton by calling "new" on this function
        var loadedPages = {};

        function fakePage(id, choices) {
            return $http.get('http://www.randomtext.me/api/gibberish/p-1/15-25').then(function(res) {
                if (choices) {
                	if(!res.data){
                		res.data.text_out = 'sample text';
                	}

                    return {
                        id: id,
                        loaded: true,
                        text: res.data.text_out.replace(/(<([^>]+)>)/ig, "").replace(/e/ig, id),
                        action: 'Action: + ' + id,
                        choices: _.map(new Array(4), function() {
                        	  return ~~(Math.random() * 20);

                            // return {
                            //     id: _.uniqueId(),
                            //     loaded: false,
                            //     text: res.data.text_out.replace(/(<([^>]+)>)/ig, ""),
                            //     action: 'Action: + ' + _.uniqueId()
                            // }
                        })
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
                        id: _.uniqueId(),
                        action: action,
                        text: text,
                        choices: []
                    };

                    loadedPages[parent].choices.push(page);
                    loadedPages[page.id] = page;

                    defer.resolve(page);
                }, 1000);

                return defer.promise;

            },
            getPage: function(n) {
                var self = this;
                var defer = $q.defer();

                setTimeout(function() {
                    if (loadedPages[n]) {
                        defer.resolve(loadedPages[n]);
                    } else {
                        fakePage(n, true).then(function(res) {
                            loadedPages[n] = res;
                            defer.resolve(loadedPages[n]);
                        })
                    }
                })

                return defer.promise;

            }
        }

    }]);
