import Material from '../material/material';
import Showcase from '../showcase/showcase';
import Row from './row/row';

'use strict';

const ngModuleName = 'app.components.table';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, Showcase, Row])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
