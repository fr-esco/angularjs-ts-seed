import Material from '../material/material';

'use strict';

const ngModuleName = 'app.components.localeexample';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, 'ui.codemirror'])
  .run(['$log', '$rootScope', '$translate', '$filter', 'amMoment',
  ($log: angular.ILogService, $rootScope: angular.IRootScopeService, $translate, $filter, amMoment)  => {
    $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '));
  }]).name;
