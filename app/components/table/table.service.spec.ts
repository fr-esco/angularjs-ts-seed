/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './table';
import TableService from './table.service';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Table Service', () => {
  let $log, $rootScope;
  let service: TableService;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$log_, _$rootScope_, _tableService_) => {
      $log = _$log_;
      $rootScope = _$rootScope_;
      service = _tableService_;
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of TableService', () => {
      expect(service).toEqual(jasmine.any(TableService));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', 'tableService', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });

  describe('## Features', () => {
    it('should load data', () => {
      let data;
      service.loadAllItems().then(items => data = items);
      $rootScope.$apply();
      expect(data).toBeNonEmptyArray();
      data.forEach(x => {
        expect(x).toHaveNonEmptyString('issue');
        expect(x).toHaveNumber('progress');
        expect(x).toHaveNonEmptyString('status');
        expect(x).toHaveString('class');
      });
    });
  });
});
