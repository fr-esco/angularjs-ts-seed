/// <reference path="../typings/custom.system.d.ts" />
/// <reference path="../typings/browser.d.ts" />

System.config({
  paths: { '*': '*.js?v=<%= VERSION %>' }
});

System.import('./app').then(System.import('./partials')).then(() => {
  angular.module('app').requires.push('tpl');

  angular.element(document)
    .ready(() => {
      // load constraints from a local file
     /* $.get('./components/profilevaldrexample/constraints.json', function (configData) {

        angular.module('app').config(['valdrProvider', function (valdrProvider) {
          console.log(JSON.stringify(configData));
          valdrProvider.addConstraints(configData);
          valdrProvider.addValidator('customValidator');
        }]);*/

        angular.bootstrap(document.body, ['app']);
  //    });
    });
})
  .catch(console.error.bind(console));
