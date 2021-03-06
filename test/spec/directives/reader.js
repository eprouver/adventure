'use strict';

describe('Directive: reader', function () {

  // load the directive's module
  beforeEach(module('adventureApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reader></reader>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the reader directive');
  }));
});
