/// <reference path="../../../../typings/browser.d.ts" />

import ngModuleName from './row';
import RowComponent from './row.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Row Component', () => {
  let log;

  beforeEach($module(ngModuleName));

  describe('## With $componentController', () => {
    let controller, scope;

    beforeEach($inject(($log, $rootScope, $componentController) => {
      log = $log;
      scope = $rootScope.$new();
      controller = $componentController('tsfnRow', { $scope: scope });
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should log registration', () => {
      let loaded = ['ngComponent', 'tsfnRow', 'loaded'].join(' ');
      expect(log.debug.logs).toContain([loaded]);
    });
  });

});
