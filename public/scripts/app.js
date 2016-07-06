'use strict';

/**
 * @ngdoc overview
 * @name deskbookersApp
 * @description
 * # deskbookersApp
 *
 * Main module of the application.
 */
angular
  .module('deskbookersApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
