/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './message';
import MessageService from './message.service';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Message Service', () => {
  let $log, $rootScope;
  let service: MessageService;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$log_, _$rootScope_, _messageService_) => {
      $log = _$log_;
      $rootScope = _$rootScope_;
      service = _messageService_;
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of MessageService', () => {
      expect(service).toEqual(jasmine.any(MessageService));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', 'messageService', 'loaded'].join(' ');
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
        expect(x).toHaveNonEmptyString('userPhoto');
        expect(x.userPhoto).toStartWith('/assets');
        expect(x).toHaveNonEmptyString('subject');
        expect(x).toHaveNonEmptyString('userName');
        expect(x).toHaveNonEmptyString('date');
        expect(x).toHaveNonEmptyString('text');
      });
    });
  });
});
