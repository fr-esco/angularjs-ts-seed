import Material from '../material/material';

import cfg from './exception.config';
import {ExceptionConstants} from './exception.model';

'use strict';

const ngModuleName = 'app.components.exception';

export default angular.module(ngModuleName, ['ngComponentRouter', Material])
  .constant('exceptionConstants', ExceptionConstants)
  .config(cfg)
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
