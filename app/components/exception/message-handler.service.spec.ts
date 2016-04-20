/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './exception';
import MessageHandlerService from './message-handler.service';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# MessageHandler Service', () => {
  let $log, $rootScope;
  let service: MessageHandlerService;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$log_, _$rootScope_, _messageHandler_) => {
      $log = _$log_;
      $rootScope = _$rootScope_;
      service = _messageHandler_;
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of MessageHandlerService', () => {
      expect(service).toEqual(jasmine.any(MessageHandlerService));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', 'messageHandler', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });

});
