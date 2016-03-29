/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './common';
import CountryService from './country.service';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Country Service', () => {
  let $log, $rootScope;
  let service: CountryService;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$log_, _$rootScope_, _countryService_) => {
      $log = _$log_;
      $rootScope = _$rootScope_;
      service = _countryService_;
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of CountryService', () => {
      expect(service).toEqual(jasmine.any(CountryService));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', 'countryService', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });

  describe('## Load Feature', () => {
    it('should load countries', () => {
      let data;
      service.loadAllItems().then(items => data = items);

      // to resolve the promises
      $rootScope.$apply();

      expect(data).toBeArrayOfObjects();
      expect(data).toBeArrayOfSize(243);
      data.forEach(x => {
        expect(x).toHaveStringSameLengthAs('code', 'XX');
        expect(x).toHaveString('display');
        expect(x).toHaveString('value');
      });
    });
  });

});
