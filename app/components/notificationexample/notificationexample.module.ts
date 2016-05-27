import Material from '../material/material';
// import cfg from './notificationexample.config';

'use strict';

const ngModuleName = 'app.components.notificationexample';

export default angular.module(ngModuleName, ['ngComponentRouter', Material])
  // .config(cfg)
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
