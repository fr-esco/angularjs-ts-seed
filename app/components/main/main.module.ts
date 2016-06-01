import Material from '../material/material';

'use strict';

const ngModuleName = 'app.components.main';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, 'cfp.hotkeys'])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
