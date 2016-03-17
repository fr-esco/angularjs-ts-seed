import Common       from './common/common';
import {Feature1}   from './feature1/feature1';
import {Home}       from './home/home';
import About        from './about/about';
import Example      from './example/example';
import Material      from './material/material';
import Main      from './main/main';

let components = angular.module('app.components', [
  Common,
  Material,
  Main,
  Home.moduleName,
  Feature1.moduleName,
  About,
  Example
]);

export {components}
