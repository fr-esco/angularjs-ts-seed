/// <reference path="<%= toComponents %>/../../typings/index.d.ts" />

import ngModuleName from './<%= modName %>';
import {<%= upCaseName %>Provider} from './<%= name %>.provider';
import <%= upCaseName %>Service from './<%= name %>.provider';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# <%= upCaseName %> Provider', () => {
  const loaded = ['ngProvider', '<%= fullName %>', 'has loaded an', '<%= upCaseName %>ProviderService'].join(' ');

  // $log.debug.logs[0] will contain the module initialization logs
  let $log;
  let provider: <%= upCaseName %>Provider;
  let service: <%= upCaseName %>Service;

  describe('## Existence of provider', () => {

    beforeEach(() => {
      $module(ngModuleName, <%= fullName %>Provider => {
        provider = <%= fullName %>Provider;
      });

      // without injecting the service, the provider is not instantiated
      $inject(_<%= fullName %>_ => {
        service = _<%= fullName %>_;
      });
    });

    it('should exist', () => {
      expect(provider).not.toBeUndefined();
      expect(provider).not.toBeNull();
    });

    it('should be an instance of <%= upCaseName %>Provider', () => {
      expect(provider).toHaveMethod('$get');
      expect(provider).toHaveMethod('makeNoise');
    });
  });

  describe('## Existence of service', () => {

    beforeEach(() => {
      $module(ngModuleName);

      $inject(_<%= fullName %>_ => {
        service = _<%= fullName %>_;
      });
    });

    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of SampleService', () => {
      expect(service).toEqual(jasmine.any(<%= upCaseName %>Service));
    });
  });

  describe('## Notify configuration - default/true', () => {

    beforeEach(() => {
      $module(ngModuleName, <%= fullName %>Provider => {
        provider = <%= fullName %>Provider;
        provider.makeNoise(true);
      });

      $inject((_$log_, _<%= fullName %>_) => {
        $log = _$log_;
        service = _<%= fullName %>_;
      });
    });

    it('should log INFO', () => {
      expect($log.debug.logs).not.toContain([loaded]);
      expect($log.info.logs).toContain([loaded]);
    });
  });

  describe('## Notify configuration - false', () => {

    beforeEach(() => {
      $module(ngModuleName, <%= fullName %>Provider => {
        provider = <%= fullName %>Provider;
        provider.makeNoise(false);
      });

      $inject((_$log_, _<%= fullName %>_) => {
        $log = _$log_;
        service = _<%= fullName %>_;
      });
    });

    it('should log DEBUG', () => {
      expect($log.debug.logs).toContain([loaded]);
      expect($log.info.logs).not.toContain([loaded]);
    });
  });
});
