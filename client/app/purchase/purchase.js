'use strict';

angular.module('projectFourApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('purchase', {
        url: '/purchase',
        templateUrl: 'app/purchase/purchase.html',
        controller: 'PurchaseCtrl',
        controllerAs: 'vm'
      });
  });
