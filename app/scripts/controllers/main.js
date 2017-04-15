'use strict';

/**
 * @ngdoc function
 * @name adventureApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the adventureApp
 */
angular.module('adventureApp')
  .controller('MainCtrl', ['$routeParams', function ($routeParams) {
  	var self = this;
  	this.page = $routeParams.pageId || 0;
  }]);
