'use strict';

let routing = ($locationProvider: angular.ILocationProvider) => {
  $locationProvider.html5Mode(true).hashPrefix('!');
};

routing.$inject = ['$locationProvider'];

export default routing;
