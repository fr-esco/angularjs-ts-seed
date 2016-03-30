'use strict';

let config = ($showdownProvider) => {
  $showdownProvider.setOption('omitExtraWLInCodeBlocks', true);
  $showdownProvider.setOption('sanitize', true);
};

config.$inject = ['$showdownProvider'];

export default config;
