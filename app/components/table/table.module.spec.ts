/// <reference path="../../../typings/browser.d.ts" />

import Table from './table';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Table Module', () => {
  beforeEach($module(Table));

  describe('## Existence', () => {
    let mod;

    beforeEach(() => mod = angular.module(Table));

    it('should exist', () => {
      expect(mod).not.toBeUndefined();
      expect(mod).not.toBeNull;
    });

    it('should have deps', () => {
      expect(mod.requires).toContain('ui.router');
      expect(mod.requires).toContain('app.components.material');
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
      let loaded = ['ngModule', Table, 'loaded'].join(' ');
      expect($log.debug.logs[1]).toContain(loaded);
    });
  });

  describe('## Log disabled', () => {
    let $log;

    beforeEach(() => {
      $module($logProvider => {
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
