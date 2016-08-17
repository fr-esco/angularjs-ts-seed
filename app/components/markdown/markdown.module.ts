import Material from '../material/material';
import config from './markdown.config';

'use strict';

const ngModuleName = 'app.components.markdown';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, 'ng-showdown'])
  .config(config)
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
