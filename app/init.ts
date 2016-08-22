/// <reference path="../typings/custom.system.d.ts" />
/// <reference path="../typings/index.d.ts" />

// System['defaultJSExtensions'] = true;

System.config({
  packages: {
    'app': {
      'main': '../app',
      'defaultExtension': 'js',
    },
    'components': {
      'main': 'components',
      'defaultExtension': 'js',
    },
  }
  // paths: { '*': '*.js?v=<%= VERSION %>' }
});

System.import('app').then(System.import('./partials.js')).then(() => {
  angular.module('app').requires.push('tpl');

  angular.element(document)
    .ready(() => angular.bootstrap(document.body, ['app']));
})
  .catch(console.error.bind(console));
