import Material from '../material/material';
import Showcase from '../showcase/showcase';
import Panel from './panel/panel';

'use strict';

const ngModuleName = 'app.components.dashboard';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, Panel, Showcase])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
