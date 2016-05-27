import Material from '../../material/material';
import Rest from 'components/rest/rest';

'use strict';

const ngModuleName = 'app.components.blog.comment';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, Rest])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
