import Material from '../material/material';

import Comment from './comment/comment';
import Post from './post/post';

'use strict';

const ngModuleName = 'app.components.blog';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, Comment, Post])
  .run(['$log', ($log: angular.ILogService) => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
