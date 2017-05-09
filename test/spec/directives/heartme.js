'use strict';

describe('Directive: heartMe', function () {

  // load the directive's module
  beforeEach(module('adventureApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<heart-me></heart-me>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the heartMe directive');
  }));
});
