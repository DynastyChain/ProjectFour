'use strict';

angular.module('projectFourApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('purchase', {
        url: '/purchase',
        templateUrl: 'app/purchase/purchase.html',
        controller: 'PurchaseCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/january', {
        url: '/purchase/january',
        templateUrl: 'app/purchase/january/purchase.jan.html',
        controller: 'JanCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/february', {
        url: '/purchase/february',
        templateUrl: 'app/purchase/february/purchase.feb.html',
        controller: 'FebCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/march', {
        url: '/purchase/march',
        templateUrl: 'app/purchase/march/purchase.mar.html',
        controller: 'MarCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/april', {
        url: '/purchase/april',
        templateUrl: 'app/purchase/april/purchase.apr.html',
        controller: 'AprCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/may', {
        url: '/purchase/may',
        templateUrl: 'app/purchase/may/purchase.may.html',
        controller: 'MayCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/june', {
        url: '/purchase/june',
        templateUrl: 'app/purchase/june/purchase.jun.html',
        controller: 'JunCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/july', {
        url: '/purchase/july',
        templateUrl: 'app/purchase/july/purchase.jul.html',
        controller: 'JulCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/august', {
        url: '/purchase/august',
        templateUrl: 'app/purchase/august/purchase.aug.html',
        controller: 'AugCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/september', {
        url: '/purchase/september',
        templateUrl: 'app/purchase/september/purchase.sep.html',
        controller: 'SepCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/october', {
        url: '/purchase/october',
        templateUrl: 'app/purchase/october/purchase.oct.html',
        controller: 'OctCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/november', {
        url: '/purchase/november',
        templateUrl: 'app/purchase/november/purchase.nov.html',
        controller: 'NovCtrl',
        controllerAs: 'vm'
      })
      .state('purchase/december', {
        url: '/purchase/december',
        templateUrl: 'app/purchase/december/purchase.dec.html',
        controller: 'DecCtrl',
        controllerAs: 'vm'
      })
  });
