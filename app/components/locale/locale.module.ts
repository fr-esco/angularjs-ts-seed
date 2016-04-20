import Material from '../material/material';
import config from './locale.config';

'use strict';

const ngModuleName = 'app.components.locale';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, 'ui.codemirror'])
  .config(config)
  .run(['$log', '$rootScope', '$translate', '$filter', 'amMoment',
  ($log: angular.ILogService, $rootScope: angular.IRootScopeService, $translate, $filter, amMoment)  => {
    $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '));
    $rootScope['$translate'] = $translate;
    $rootScope['amMoment'] = amMoment;
  }]).name;
