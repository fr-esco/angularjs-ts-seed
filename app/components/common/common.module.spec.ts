/// <reference path="../../../typings/browser.d.ts" />

import Common from './common';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Common Module', () => {
  beforeEach($module(Common));

  describe('## Existence', () => {
    let mod;

    beforeEach(() => mod = angular.module(Common));

    it('should exist', () => {
      expect(mod).not.toBeUndefined();
      expect(mod).not.toBeNull;
    });

    it('should have deps', () => {
      expect(mod.requires).toContain('ngComponentRouter');
    });
  });

  describe('## Log enabled', () => {
    let $log;

    beforeEach(() => {
      $inject(_$log_ => {
        $log = _$log_;
      });
    });

    it('should log registration', () => {
      let loaded = ['ngModule', Common, 'loaded'].join(' ');
      expect($log.debug.logs[0][0]).toContain([loaded]);
    });
  });

  describe('## Log disabled', () => {
    let $log;

    beforeEach(() => {
      $module(function($logProvider) {
        $logProvider.debugEnabled(false);
      });

      $inject(_$log_ => {
        $log = _$log_;
      });
    });

    it('should not log registration', () => {
      expect($log.assertEmpty).not.toThrow();
    });
  });
});
