/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './hotkeys';
import HotkeysComponent from './hotkeys.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Hotkeys Component', () => {
  let log;

  beforeEach($module(ngModuleName));

  describe('## With $compile', () => {
    let element, scope;

    beforeEach($inject(($log, $compile, $rootScope) => {
      log = $log;
      scope = $rootScope.$new();
      element = angular.element('<tsfn-hotkeys my-attribute="{{attr}}" my-one-way-binding="outside"></tsfn-hotkeys>');
      element = $compile(element)(scope);
      scope.attr = 'example';
      scope.outside = '1.5';
      scope.$apply();
    }));
  });
});
