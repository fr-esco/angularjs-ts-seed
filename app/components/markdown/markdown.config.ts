'use strict';

let decorator = ($sanitize: angular.sanitize.ISanitizeService, $delegate) => {
  let makeHtml = $delegate.makeHtml;
  $delegate.makeHtml = (markdown: string) => $sanitize(makeHtml(markdown));
  return $delegate;
};

decorator.$inject = ['$sanitize', '$delegate'];

let config = ($provide, $showdownProvider) => {
  $showdownProvider
    .setOption('omitExtraWLInCodeBlocks', true);

  $provide.decorator('$showdown', decorator);
};

config.$inject = ['$provide', '$showdownProvider'];

export default config;
