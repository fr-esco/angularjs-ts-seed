/// <reference path="<%= toComponents %>/../../typings/browser.d.ts" />

import ngModuleName from './<%= modName %>';
import <%= upCaseName %>Service from './<%= name %>.service';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# <%= upCaseName %> Service', () => {
  let $log, $rootScope;
  let service: <%= upCaseName %>Service;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$log_, _$rootScope_, _<%= name %>_) => {
      $log = _$log_;
      $rootScope = _$rootScope_;
      service = _<%= name %>_;
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of <%= upCaseName %>Service', () => {
      expect(service).toEqual(jasmine.any(<%= upCaseName %>Service));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', '<%= name %>', 'loaded'].join(' ');
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
