'use strict';

const ngModuleName = 'app.components.common';

export default angular.module(ngModuleName, ['ngComponentRouter'])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
