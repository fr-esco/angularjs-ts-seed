/// <reference path="../../../typings/index.d.ts" />

import ngModuleName from './locale';
import {LocaleProvider} from './locale.provider';
import LocaleService from './locale.provider';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));
// let $dump = (arg: any): void => console.log(arg);

xdescribe('# Locale Provider', () => {
  const loaded = ['ngProvider', 'locale', 'has loaded an', 'LocaleProviderService'].join(' ');

  let $log;
  let provider: LocaleProvider;
  let service: LocaleService;

  describe('## Existence of provider', () => {

    beforeEach(() => {
      $module(ngModuleName, localeProvider => {
        provider = localeProvider;
      });

      // without injecting the service, the provider is not instantiated
      $inject(_locale_ => {
        service = _locale_;
      });
    });

    it('should exist', () => {
      expect(provider).not.toBeUndefined();
      expect(provider).not.toBeNull();
    });

    it('should be an instance of LocaleProvider', () => {
      expect(provider).toHaveMethod('$get');
      expect(provider).toHaveMethod('makeNoise');
    });
  });

  describe('## Existence of service', () => {

    beforeEach(() => {
      $module(ngModuleName);

      $inject(_locale_ => {
        service = _locale_;
      });
    });

    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of LocaleService', () => {
      expect(service).toEqual(jasmine.any(LocaleService));
    });
  });

  describe('## Notify configuration - default/true', () => {

    beforeEach(() => {
      $module(ngModuleName, localeProvider => {
        provider = localeProvider;
        provider.makeNoise(true);
      });

      $inject((_$log_, _locale_) => {
        $log = _$log_;
        service = _locale_;
      });
    });

    it('should log INFO', () => {
      expect($log.debug.logs).not.toContain([loaded]);
      expect($log.info.logs).toContain([loaded]);
    });
  });

  describe('## Notify configuration - false', () => {

    beforeEach(() => {
      $module(ngModuleName, localeProvider => {
        provider = localeProvider;
        provider.makeNoise(false);
      });

      $inject((_$log_, _locale_) => {
        $log = _$log_;
        service = _locale_;
      });
    });

    it('should log DEBUG', () => {
      expect($log.debug.logs).toContain([loaded]);
      expect($log.info.logs).not.toContain([loaded]);
    });
  });
});
