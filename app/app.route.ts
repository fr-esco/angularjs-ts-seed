'use strict'

let routing = ($httpProvider: angular.IHttpProvider,
  $locationProvider: angular.ILocationProvider) => {
  $httpProvider.useApplyAsync(true)
  // $locationProvider.html5Mode(true).hashPrefix('!')
}

routing.$inject = ['$httpProvider', '$locationProvider']

export default routing
