import Material from '../../material/material';
import Markdown from '../../markdown/markdown';
import Rest from '../../rest/rest';

'use strict';

const ngModuleName = 'app.components.blog.post';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, Markdown, Rest])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
