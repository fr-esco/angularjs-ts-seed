/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './table';
import TableComponent from './table.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Table Component', () => {
  let log;

  beforeEach(() => {
    $module(ngModuleName);

    $module($provide => {
      $provide.service('tableService', ['$q', function($q) {
        this.loadAllItems = () => $q.when([{
          issue: 'Nested views',
          progress: 100,
          status: 'Done',
          class: 'md-accent'
        }]);
      }]);
    });

  });

  describe('## With $componentController', () => {
    let controller, scope;

    beforeEach($inject(($log, $rootScope, $componentController) => {
      log = $log;
      scope = $rootScope.$new();
      controller = $componentController('tsfnTable', { $scope: scope });
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should log registration', () => {
      let loaded = ['ngComponent', 'tsfnTable', 'loaded'].join(' ');
      expect(log.debug.logs).toContain([loaded]);
    });

    it('should have title', () => {
      let title = 'Table';
      controller.$routerOnActivate({ routeData: { data: { title: title } } });
      scope.$apply();
      expect(controller.title).toBe(title);
    });

    it('should have file configuration', () => {
      expect(controller.files).toBeArrayOfSize(4);
      controller.files.forEach(x => {
        expect(x).toStartWith('components/');
      });
    });

    it('should be init', () => {
      controller.$onInit();
      scope.$apply();

      expect(controller.tableData).toBeNonEmptyArray();
      controller.tableData.forEach(data => {
        expect(data).toHaveNonEmptyString('issue');
        expect(data).toHaveNumber('progress');
        expect(data).toHaveNonEmptyString('status');
        expect(data).toHaveNonEmptyString('class');
      });
    });
  });
});
