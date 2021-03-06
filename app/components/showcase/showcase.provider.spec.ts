/// <reference path="../../../typings/index.d.ts" />

import ngModuleName from './showcase';
import {ShowcaseProvider} from './showcase.provider';
import ShowcaseService from './showcase.provider';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));
// let $dump = (arg: any): void => console.log(arg);

describe('# Showcase Provider', () => {
  const loaded = ['ngProvider', 'showcase', 'has loaded an', 'ShowcaseProviderService'].join(' ');

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
      expect(provider).toHaveMethod('delay');
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

  describe('## Delay configuration - default', () => {

    beforeEach(() => {
      $module(ngModuleName, showcaseProvider => {
        provider = showcaseProvider;
      });

      $inject((_$log_, _showcase_) => {
        $log = _$log_;
        service = _showcase_;
      });
    });

    it('should log registration', () => {
      expect($log.debug.logs).toContain([loaded]);
    });
  });

  describe('## Delay configuration - custom', () => {

    beforeEach(() => {
      $module(ngModuleName, showcaseProvider => {
        provider = showcaseProvider;
        provider.delay(200);
      });

      $inject((_$log_, _showcase_) => {
        $log = _$log_;
        service = _showcase_;
      });
    });

    it('should log registration', () => {
      expect($log.debug.logs).toContain([loaded]);
    });
  });

  describe('## Features of service', () => {
    let $httpBackend, $rootScope;

    beforeEach(() => {
      $module(ngModuleName);

      $inject((_showcase_, _$httpBackend_, _$rootScope_) => {
        service = _showcase_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
      });
    });

    it('should load files', $inject($timeout => {
      let fake = (method, url) => {
        let parts = url.split('/'),
          file = parts[parts.length - 1];
        return [200, file];
      };
      $httpBackend
        .expect('GET', /(\.html|\.ts)$/)
        .respond(fake);
      $httpBackend
        .expect('GET', /(\.html|\.ts)$/)
        .respond(fake);

      let fileList = ['example.html', 'example.ts'];
      let all = service.load(fileList);

      $timeout.flush(1000);
      expect($timeout.verifyNoPendingTasks).not.toThrow();

      expect($httpBackend.flush).not.toThrow();

      all.then(content => {
        fileList.forEach(file => {
          expect(content[file]).toBe(file);
        });
      });

      $rootScope.$apply();
    }));

    afterEach(() => {
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
      expect($httpBackend.verifyNoOutstandingRequest).not.toThrow();
    });
  });

  describe('## Features of service - no delay', () => {
    let $httpBackend, $rootScope;

    beforeEach(() => {
      $module(ngModuleName, showcaseProvider => {
        provider = showcaseProvider;
        provider.delay(0);
      });

      $inject((_showcase_, _$httpBackend_, _$rootScope_) => {
        service = _showcase_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
      });
    });

    it('should load files', () => {
      let fake = (method, url) => {
        let parts = url.split('/'),
          file = parts[parts.length - 1];
        return [200, file];
      };
      $httpBackend
        .expect('GET', /(\.html|\.ts)$/)
        .respond(fake);
      $httpBackend
        .expect('GET', /(\.html|\.ts)$/)
        .respond(fake);

      let fileList = ['example.html', 'example.ts'];
      let all = service.load(fileList);

      expect($httpBackend.flush).not.toThrow();

      all.then(content => {
        fileList.forEach(file => {
          expect(content[file]).toBe(file);
        });
      });

      $rootScope.$apply();
    });

    afterEach(() => {
      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
      expect($httpBackend.verifyNoOutstandingRequest).not.toThrow();
    });
  });
});
