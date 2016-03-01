'use strict';

angular.module('projectFourApp.auth', [
  'projectFourApp.constants',
  'projectFourApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
