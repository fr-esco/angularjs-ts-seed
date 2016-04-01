import Material from '../material/material';

import Post from './post/post';

'use strict';

const ngModuleName = 'app.components.blog';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, Post])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
