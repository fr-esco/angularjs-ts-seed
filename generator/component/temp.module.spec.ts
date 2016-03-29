/// <reference path="<%= toComponents %>/../../typings/browser.d.ts" />

import <%= upCaseName %> from './<%= name %>';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# <%= upCaseName %> Module', () => {
  beforeEach($module(<%= upCaseName %>));

  describe('## Existence', () => {
    let mod;

    beforeEach(() => mod = angular.module(<%= upCaseName %>));

    it('should exist', () => {
      expect(mod).not.toBeUndefined();
      expect(mod).not.toBeNull;
    });

    it('should have deps', () => {
      expect(mod.requires).toContain('ngComponentRouter');
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
      let loaded = ['ngModule', <%= upCaseName %>, 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
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
