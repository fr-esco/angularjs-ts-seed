/// <reference path="../typings/custom.system.d.ts" />
/// <reference path="../typings/index.d.ts" />

// System['defaultJSExtensions'] = true

// @if NODE_ENV=='DEVELOPMENT'
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
})

System.import('app')
  .then(System.import('./partials.js'))
  .then(() => {
    angular.module('app').requires.push('tpl')

    angular.element(document)
      .ready(() => angular.bootstrap(document.body, ['app']))
  })
  .catch(console.error.bind(console))
// @endif

// @if NODE_ENV=='PRODUCTION'
System.import('./app.js')
  .then(System.import('./partials.js'))
  .then(System.import('app') // PROD
    .then(() => {
      angular.module('app').requires.push('tpl')

      angular.element(document)
        .ready(() => angular.bootstrap(document.body, ['app']))
    })
  )
  .catch(console.error.bind(console))
// @endif
