/// <reference path="../../../typings/index.d.ts" />

import ngModuleName from './locale';
import LocaleComponent from './locale.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Locale Component', () => {
  let log;

  beforeEach($module(ngModuleName));

  describe('## With $componentController', () => {
    let controller, scope, service;

    beforeEach($inject(($rootScope, $componentController, locale) => {
      scope = $rootScope.$new();
      service = locale;
      controller = $componentController('tsfnLocale', { $scope: scope, locale: service }, {
        fileList: ['example.html', 'example.ts', 'example.css'],
        title: 'Locale'
      });
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller);
    });
  });
});
