/// <reference path="../typings/index.d.ts" />

import routing from './app.route';
import {components} from './components/components';

const ngMainComponentName = 'tsngApp';

let app = angular.module('app', [
  'ngComponentRouter',
  'ngAnimate',
  'ngCookies',
  'ngSanitize',
  // 'ngTouch',
  'nvd3',
  'tmh.dynamicLocale',
  'pascalprecht.translate',
  'angularMoment',
  components.name,
]).config(routing)
  .value('$routerRootComponent', ngMainComponentName);

@at.component('app', ngMainComponentName, {
  // templateUrl: 'app.html?v=<%= VERSION %>',
  templateUrl: 'app.html',
  $routeConfig: [
    { path: '/...', name: 'Main', component: 'tsngMain' },
  ]
})
@at.inject('$log')
class App {
  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngMainComponentName, 'loaded'].join(' '));
  }
}

export default app;

angular.element(document)
  .ready(() => angular.bootstrap(document.body, [app.name]));
