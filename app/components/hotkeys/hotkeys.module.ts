import Material from '../material/material';
import Showcase from 'components/showcase/showcase';
'use strict';

const ngModuleName = 'app.components.hotkeys';

export default angular.module(ngModuleName, ['ngComponentRouter', Showcase, Material])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
