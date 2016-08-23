import Material from '../material/material';

'use strict';

const ngModuleName = 'app.components.message';

export default angular.module(ngModuleName, ['ngComponentRouter', Material])
  .run(['$log', ($log: angular.ILogService) => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
