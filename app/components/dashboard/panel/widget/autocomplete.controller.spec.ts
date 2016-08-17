/// <reference path="../../../../../typings/browser.d.ts" />

import ngModuleName from './widget';
import AutocompleteController from './autocomplete.controller';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Autocomplete Controller', () => {
  let $controller, $log, $rootScope;
  let controller: AutocompleteController;

  beforeEach(() => {
    $module(ngModuleName);

    $module($provide => {
      $provide.service('countryService', ['$q', function($q) {
        this.loadAllItems = () => $q.when([
          {
            value: 'Afghanistan'.toLowerCase(),
            display: 'Afghanistan',
            code: 'AF'
          }, {
            value: 'Albania'.toLowerCase(),
            display: 'Albania',
            code: 'AL'
          }, {
            value: 'Algeria'.toLowerCase(),
            display: 'Algeria',
            code: 'DZ'
          }
        ]);
      }]);
    });

    $inject((_$controller_, _$log_, _$rootScope_) => {
      $controller = _$controller_;
      $log = _$log_;
      $rootScope = _$rootScope_;
    });

    controller = $controller('AutocompleteController', {
      $scope: $rootScope.$new()
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(controller).not.toBeUndefined();
      expect(controller).not.toBeNull();
    });

    it('should be an instance of AutocompleteController', () => {
      expect(controller).toEqual(jasmine.any(AutocompleteController));
    });

    it('should have properties', () => {
      $rootScope.$apply();
      expect(controller.disableCaching).toBe(true);
      expect(controller.countries).toBeArrayOfObjects();
      expect(controller.countries).toBeArrayOfSize(3);
      expect(controller.searchText).toBeUndefined();
      expect(controller.selectedCountry).toBeUndefined();
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngController', 'AutocompleteController', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });

  describe('## Search', () => {
    beforeEach(() => $rootScope.$apply()); // to load countries

    it('should filter countries (default)', $inject($timeout => {
      controller.querySearch().then(results => expect(results).toBeEmptyArray());
      $timeout.flush(1000);
      expect($timeout.verifyNoPendingTasks).not.toThrow();
      $rootScope.$apply();
    }));
    it('should filter countries (no results)', $inject($timeout => {
      controller.querySearch('B').then(results => expect(results).toBeEmptyArray());
      $timeout.flush(1000);
      expect($timeout.verifyNoPendingTasks).not.toThrow();
      $rootScope.$apply();
    }));
    it('should filter countries (one result case-insensitive)', $inject($timeout => {
      controller.querySearch('AfG').then(results => expect(results).toBeArrayOfSize(1));
      $timeout.flush(1000);
      expect($timeout.verifyNoPendingTasks).not.toThrow();
      $rootScope.$apply();
    }));
    it('should filter countries (multiple results case-insensitive)', $inject($timeout => {
      controller.querySearch('al').then(results => expect(results).toBeArrayOfSize(2));
      $timeout.flush(1000);
      expect($timeout.verifyNoPendingTasks).not.toThrow();
      $rootScope.$apply();
    }));
  });
});
