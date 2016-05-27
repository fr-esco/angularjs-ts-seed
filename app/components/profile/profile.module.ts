import Material from '../material/material';
import Showcase from 'components/showcase/showcase';
'use strict';

const ngModuleName = 'app.components.profile';

export default angular.module(ngModuleName, ['ngComponentRouter', 'ngMessages', Material, Showcase])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
