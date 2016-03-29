import Material from '../material/material';

'use strict';

const ngModuleName = 'app.components.showcase';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, 'ui.codemirror'])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
