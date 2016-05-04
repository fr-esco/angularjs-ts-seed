/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './uac';
import UacService from './uac.service';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Uac Service', () => {
  let $log, $rootScope;
  let service: UacService;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$log_, _$rootScope_, _tsfnUac_) => {
      $log = _$log_;
      $rootScope = _$rootScope_;
      service = _tsfnUac_;
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of UacService', () => {
      expect(service).toEqual(jasmine.any(UacService));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', 'tsfnUac', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });

  describe('## Load Feature', () => {
    it('should load a flag', () => {
      let data;
      service.load().then(flag => data = flag);

      // to resolve the promises
      $rootScope.$apply();

      expect(data).toBeTrue();
    });
  });

});
