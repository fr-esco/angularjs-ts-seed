/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './timezone';
import {TimezoneProvider} from './timezone.provider';
import TimezoneService from './timezone.provider';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Timezone Provider', () => {
  const loaded = ['ngProvider', 'timezone', 'has loaded an', 'TimezoneProviderService'].join(' ');

  // $log.debug.logs[0] will contain the module initialization logs
  let $log;
  let provider: TimezoneProvider;
  let service: TimezoneService;

  describe('## Existence of provider', () => {

    beforeEach(() => {
      $module(ngModuleName, timezoneProvider => {
        provider = timezoneProvider;
      });

      // without injecting the service, the provider is not instantiated
      $inject(_timezone_ => {
        service = _timezone_;
      });
    });

    it('should exist', () => {
      expect(provider).not.toBeUndefined();
      expect(provider).not.toBeNull();
    });

    it('should be an instance of TimezoneProvider', () => {
      expect(provider).toHaveMethod('$get');
      expect(provider).toHaveMethod('makeNoise');
    });
  });

  describe('## Existence of service', () => {

    beforeEach(() => {
      $module(ngModuleName);

      $inject(_timezone_ => {
        service = _timezone_;
      });
    });

    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of SampleService', () => {
      expect(service).toEqual(jasmine.any(TimezoneService));
    });
  });

  describe('## Notify configuration - default/true', () => {

    beforeEach(() => {
      $module(ngModuleName, timezoneProvider => {
        provider = timezoneProvider;
        provider.makeNoise(true);
      });

      $inject((_$log_, _timezone_) => {
        $log = _$log_;
        service = _timezone_;
      });
    });

    it('should log INFO', () => {
      expect($log.debug.logs).not.toContain([loaded]);
      expect($log.info.logs).toContain([loaded]);
    });
  });

  describe('## Notify configuration - false', () => {

    beforeEach(() => {
      $module(ngModuleName, timezoneProvider => {
        provider = timezoneProvider;
        provider.makeNoise(false);
      });

      $inject((_$log_, _timezone_) => {
        $log = _$log_;
        service = _timezone_;
      });
    });

    it('should log DEBUG', () => {
      expect($log.debug.logs).toContain([loaded]);
      expect($log.info.logs).not.toContain([loaded]);
    });
  });
});
