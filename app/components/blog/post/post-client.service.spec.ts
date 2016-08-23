/// <reference path="../../../../typings/index.d.ts" />

import ngModuleName from './post';
import PostClientService from './post-client.service';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# PostClient Service', () => {
  let $log, $rootScope;
  let service: PostClientService;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$log_, _$rootScope_, _postClient_) => {
      $log = _$log_;
      $rootScope = _$rootScope_;
      service = _postClient_;
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of PostClientService', () => {
      expect(service).toEqual(jasmine.any(PostClientService));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', 'postClient', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });
/*
  describe('## Load Feature', () => {
    it('should load a flag', () => {
      let data;
      service.load().then(flag => data = flag);

      // to resolve the promises
      $rootScope.$apply();

      expect(data).toBeTrue();
    });
  });
*/
});
