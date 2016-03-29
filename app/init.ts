/// <reference path="../typings/custom.system.d.ts" />
/// <reference path="../typings/browser.d.ts" />

System.config({
  paths: { '*': '*.js?v=<%= VERSION %>' }
});

System.import('./app').then(System.import('./partials')).then(() => {
  angular.module('app').requires.push('tpl');

  angular.element(document)
    .ready(() => angular.bootstrap(document.body, ['app']));
})
  .catch(console.error.bind(console));
