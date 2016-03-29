/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './showcase';
import {ShowcaseProvider} from './showcase.provider';
import ShowcaseService from './showcase.provider';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Showcase Provider', () => {
  const loaded = ['ngProvider', 'showcase', 'has loaded an', 'ShowcaseProviderService'].join(' ');

  // $log.debug.logs[0] will contain the module initialization logs
  let $log;
  let provider: ShowcaseProvider;
  let service: ShowcaseService;

  describe('## Existence of provider', () => {

    beforeEach(() => {
      $module(ngModuleName, showcaseProvider => {
        provider = showcaseProvider;
      });

      // without injecting the service, the provider is not instantiated
      $inject(_showcase_ => {
        service = _showcase_;
      });
    });

    it('should exist', () => {
      expect(provider).not.toBeUndefined();
      expect(provider).not.toBeNull();
    });

    it('should be an instance of ShowcaseProvider', () => {
      expect(provider).toHaveMethod('$get');
      expect(provider).toHaveMethod('makeNoise');
    });
  });

  describe('## Existence of service', () => {

    beforeEach(() => {
      $module(ngModuleName);

      $inject(_showcase_ => {
        service = _showcase_;
      });
    });

    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of SampleService', () => {
      expect(service).toEqual(jasmine.any(ShowcaseService));
    });
  });

  describe('## Notify configuration - default/true', () => {

    beforeEach(() => {
      $module(ngModuleName, showcaseProvider => {
        provider = showcaseProvider;
        provider.makeNoise(true);
      });

      $inject((_$log_, _showcase_) => {
        $log = _$log_;
        service = _showcase_;
      });
    });

    it('should log INFO', () => {
      expect($log.debug.logs).not.toContain([loaded]);
      expect($log.info.logs).toContain([loaded]);
    });
  });

  describe('## Notify configuration - false', () => {

    beforeEach(() => {
      $module(ngModuleName, showcaseProvider => {
        provider = showcaseProvider;
        provider.makeNoise(false);
      });

      $inject((_$log_, _showcase_) => {
        $log = _$log_;
        service = _showcase_;
      });
    });

    it('should log DEBUG', () => {
      expect($log.debug.logs).toContain([loaded]);
      expect($log.info.logs).not.toContain([loaded]);
    });
  });
});
