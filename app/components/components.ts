import {Feature1}   from './feature1/feature1';
import {Home}       from './home/home';
import About        from './about/about.module';

let components = angular.module('app.components', [
  Home.moduleName,
  Feature1.moduleName,
  About
]);

export {components}
