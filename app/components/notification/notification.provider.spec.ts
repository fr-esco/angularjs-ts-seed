/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './notification';
import {NotificationProvider} from './notification.provider';
import NotificationService from './notification.provider';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

xdescribe('# Notification Provider', () => {
  const loaded = ['ngProvider', 'notification', 'has loaded an', 'NotificationProviderService'].join(' ');

  // $log.debug.logs[0] will contain the module initialization logs
  let $log;
  let provider: NotificationProvider;
  let service: NotificationService;

  describe('## Existence of provider', () => {

    beforeEach(() => {
      $module(ngModuleName, notificationProvider => {
        provider = notificationProvider;
      });

      // without injecting the service, the provider is not instantiated
      $inject(_notification_ => {
        service = _notification_;
      });
    });

    it('should exist', () => {
      expect(provider).not.toBeUndefined();
      expect(provider).not.toBeNull();
    });

    it('should be an instance of NotificationProvider', () => {
      expect(provider).toHaveMethod('$get');
      expect(provider).toHaveMethod('makeNoise');
    });
  });

  describe('## Existence of service', () => {

    beforeEach(() => {
      $module(ngModuleName);

      $inject(_notification_ => {
        service = _notification_;
      });
    });

    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of SampleService', () => {
      expect(service).toEqual(jasmine.any(NotificationService));
    });
  });

  describe('## Notify configuration - default/true', () => {

    beforeEach(() => {
      $module(ngModuleName, notificationProvider => {
        provider = notificationProvider;
        provider.makeNoise(true);
      });

      $inject((_$log_, _notification_) => {
        $log = _$log_;
        service = _notification_;
      });
    });

    it('should log INFO', () => {
      expect($log.debug.logs).not.toContain([loaded]);
      expect($log.info.logs).toContain([loaded]);
    });
  });

  describe('## Notify configuration - false', () => {

    beforeEach(() => {
      $module(ngModuleName, notificationProvider => {
        provider = notificationProvider;
        provider.makeNoise(false);
      });

      $inject((_$log_, _notification_) => {
        $log = _$log_;
        service = _notification_;
      });
    });

    it('should log DEBUG', () => {
      expect($log.debug.logs).toContain([loaded]);
      expect($log.info.logs).not.toContain([loaded]);
    });
  });
});
