/// <reference path="../../../typings/browser.d.ts" />

import Common from './common';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Common Config', () => {
  beforeEach($module(Common));

  describe('## Existence - Object', () => {
    it('should exist', $inject(appCommonValue => {
      expect(appCommonValue).not.toBeUndefined();
      expect(appCommonValue).not.toBeNull;
    }));

    it('should have properties', $inject(appCommonValue => {
      expect(appCommonValue.appLanguage).toEqual('en');
      expect(appCommonValue.appSourceLanguage).toEqual('en');
    }));
  });

  describe('## Existence - Property', () => {
    it('should exist', $inject(appTitle => {
      expect(appTitle).not.toBeUndefined();
      expect(appTitle).not.toBeNull;
    }));

    it('should have a value', $inject(appTitle => {
      expect(appTitle).toEqual('Application');
    }));
  });

  describe('## Existence - Function', () => {
    it('should exist', $inject(appHello => {
      expect(appHello).not.toBeUndefined();
      expect(appHello).not.toBeNull;
    }));

    it('should say hello', $inject(appHello => {
      expect(appHello()).toEqual('Hello, Application');
    }));
  });
});
