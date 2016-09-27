'use strict'

let decorator = ($sanitize: angular.sanitize.ISanitizeService, $delegate) => {
  'ngInject'
  let makeHtml = $delegate.makeHtml
  $delegate.makeHtml = (markdown: string) => $sanitize(makeHtml(markdown))
  return $delegate
}

decorator.$inject = ['$sanitize', '$delegate']

let config = ($provide: angular.auto.IProvideService, $showdownProvider) => {
  'ngInject'
  $showdownProvider
    .setOption('omitExtraWLInCodeBlocks', true)

  $provide.decorator('$showdown', decorator)
}

export default config
