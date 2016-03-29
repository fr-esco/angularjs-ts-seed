/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './common';
import NavigationService from './navigation.service';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Navigation Service', () => {
  let $log, $rootScope;
  let service: NavigationService;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$log_, _$rootScope_, _navigationService_) => {
      $log = _$log_;
      $rootScope = _$rootScope_;
      service = _navigationService_;
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of NavigationService', () => {
      expect(service).toEqual(jasmine.any(NavigationService));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', 'navigationService', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });

  describe('## Load Feature', () => {
    it('should load menu items', () => {
      let data;
      service.loadAllItems().then(items => data = items);

      // to resolve the promises
      $rootScope.$apply();

      expect(data).toBeArrayOfObjects();
      expect(data).toBeArrayOfSize(3);
      data.forEach(x => {
        expect(x).toHaveString('name');
        expect(x).toHaveString('icon');
        expect(x).toHaveString('sref');
        expect(x).toHaveArrayOfStrings('link');
      });
    });
  });

});
