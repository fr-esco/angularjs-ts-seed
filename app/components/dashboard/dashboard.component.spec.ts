/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './dashboard';
import DashboardComponent from './dashboard.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Dashboard Component', () => {
  let log;

  beforeEach($module(ngModuleName));

  describe('## With $componentController', () => {
    let controller, scope;

    beforeEach($inject(($log, $rootScope, $componentController) => {
      log = $log;
      scope = $rootScope.$new();
      controller = $componentController('tsfnDashboard', { $scope: scope });
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should log registration', () => {
      let loaded = ['ngComponent', 'tsfnDashboard', 'loaded'].join(' ');
      expect(log.debug.logs).toContain([loaded]);
    });

    it('should have title', () => {
      let title = 'Dashboard';
      controller.$routerOnActivate({ routeData: { data: { title: title } } });
      scope.$apply();
      expect(controller.title).toBe(title);
    });

    it('should have file configuration', () => {
      expect(controller.files).toBeArrayOfSize(5);
      controller.files.forEach(x => {
        expect(x).toBeArrayOfStrings();
        x.forEach(file => expect(file).toStartWith('components/'));
      });
    });
  });
});
