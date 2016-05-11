import Material from '../material/material';
import Showcase from '../showcase/showcase';
import valdrConf from './profilevaldr.config';
'use strict';

const ngModuleName = 'app.components.profilevaldrexample';

export default angular.module(ngModuleName, ['ngComponentRouter', 'valdr', Material, Showcase])
 .config(valdrConf)
.run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;

