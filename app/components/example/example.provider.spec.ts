/// <reference path="../../../typings/browser.d.ts" />

import Example from './example';
import {ExampleProvider} from './example.provider';
import SampleService from './example.provider';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Example Provider', () => {
  const loaded = ['ngProvider', 'sample', 'has loaded an', 'ExampleProviderService'].join(' ');

  // $log.debug.logs[0] will contain the module initialization logs
  let $log;
  let provider: ExampleProvider;
  let service: SampleService;

  describe('## Existence of provider', () => {

    beforeEach(() => {
      $module(Example, sampleProvider => {
        provider = sampleProvider;
      });

      // without injecting the service, the provider is not instantiated
      $inject(_sample_ => {
        service = _sample_;
      });
    });

    it('should exist', () => {
      expect(provider).not.toBeUndefined();
      expect(provider).not.toBeNull();
    });

    it('should be an instance of ExampleProvider', () => {
      expect(provider).toHaveMethod('$get');
      expect(provider).toHaveMethod('makeNoise');
    });
  });

  describe('## Existence of service', () => {

    beforeEach(() => {
      $module(Example);

      $inject(_sample_ => {
        service = _sample_;
      });
    });

    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of SampleService', () => {
      expect(service).toEqual(jasmine.any(SampleService));
    });
  });

  describe('## Notify configuration - default/true', () => {

    beforeEach(() => {
      $module(Example, sampleProvider => {
        provider = sampleProvider;
        provider.makeNoise(true);
      });

      $inject((_$log_, _sample_) => {
        $log = _$log_;
        service = _sample_;
      });
    });

    it('should log INFO', () => {
      expect($log.debug.logs[1]).toBeUndefined();
      expect($log.info.logs[0]).toContain(loaded);
    });
  });

  describe('## Notify configuration - false', () => {

    beforeEach(() => {
      $module(Example, sampleProvider => {
        provider = sampleProvider;
        provider.makeNoise(false);
      });

      $inject((_$log_, _sample_) => {
        $log = _$log_;
        service = _sample_;
      });
    });

    it('should log DEBUG', () => {
      expect($log.debug.logs[1]).toContain(loaded);
      expect($log.info.logs[0]).toBeUndefined();
    });
  });
});
