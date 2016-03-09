'use strict';

angular.module('projectFourApp', [
  'projectFourApp.auth',
  'projectFourApp.admin',
  'projectFourApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
