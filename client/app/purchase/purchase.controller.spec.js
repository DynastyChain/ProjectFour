'use strict';

describe('Controller: PurchaseCtrl', function () {

  // load the controller's module
  beforeEach(module('projectFourApp'));

  var PurchaseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PurchaseCtrl = $controller('PurchaseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
