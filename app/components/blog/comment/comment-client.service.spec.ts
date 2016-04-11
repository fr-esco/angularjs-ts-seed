/// <reference path="../../../../typings/browser.d.ts" />

import ngModuleName from './comment';
import CommentClientService from './comment-client.service';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# CommentClient Service', () => {
  let $log, $rootScope;
  let service: CommentClientService;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$log_, _$rootScope_, _commentClient_) => {
      $log = _$log_;
      $rootScope = _$rootScope_;
      service = _commentClient_;
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of CommentClientService', () => {
      expect(service).toEqual(jasmine.any(CommentClientService));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', 'commentClient', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });
});
