/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './uacexample';
import UacexampleComponent from './uacexample.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Uacexample Component', () => {
  let log;

  beforeEach($module(ngModuleName));

  describe('## With $compile', () => {
    let element, scope;

    beforeEach($inject(($log, $compile, $rootScope) => {
      log = $log;
      scope = $rootScope.$new();
      element = angular.element('<tsfn-uacexample my-attribute="{{attr}}" my-one-way-binding="outside"></tsfn-uacexample>');
      element = $compile(element)(scope);
      scope.attr = 'example';
      scope.outside = '1.5';
      scope.$apply();
    }));

    it('should log registration', () => {
      let loaded = ['ngModule', 'app.components.uacexample', 'loaded'].join(' ');
      expect(log.debug.logs).toContain([loaded]);
    });
  });
});
