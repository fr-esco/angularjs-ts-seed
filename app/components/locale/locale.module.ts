import Material from '../material/material';
import config from './locale.config';

'use strict';

const ngModuleName = 'app.components.locale';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, 'ui.codemirror'])
  .config(config)
  .run(['$log', '$rootScope', '$translate', '$filter', ($log: angular.ILogService, $rootScope: angular.IRootScopeService, $translate, $filter)  => {
    $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '));
    $rootScope['$translate'] = $translate;
  }]).name;
