import Material from '../material/material';

'use strict';

const ngModuleName = 'app.components.timezone';

export default angular.module(ngModuleName, ['ngComponentRouter', Material])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
