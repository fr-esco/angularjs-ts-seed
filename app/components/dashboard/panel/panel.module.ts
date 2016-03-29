import Material from '../../material/material';
import Widget from './widget/widget';

'use strict';

const ngModuleName = 'app.components.dashboard.panel';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, Widget])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
