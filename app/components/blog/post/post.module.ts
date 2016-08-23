import Material from '../../material/material';
import Markdown from '../../markdown/markdown';
import Rest from '../../rest/rest';

import Comment from '../comment/comment';

'use strict';

const ngModuleName = 'app.components.blog.post';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, Markdown, Rest, Comment])
  .run(['$log', ($log: angular.ILogService) => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
