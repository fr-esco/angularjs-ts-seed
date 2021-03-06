import config from './rest.config';

'use strict';

const ngModuleName = 'app.components.rest';

export default angular.module(ngModuleName, ['restangular'])
  .config(config)
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
