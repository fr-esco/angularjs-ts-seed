import Material from '../../material/material';
import Rest from '../../rest/rest';

'use strict';

const ngModuleName = 'app.components.blog.comment';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, Rest])
  .run(['$log', ($log: angular.ILogService) => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
