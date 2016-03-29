/// <reference path="<%= toComponents %>/../../typings/browser.d.ts" />

import ngModuleName from './<%= modName %>';
import <%= upCaseName %>Controller from './<%= name %>.controller';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# <%= upCaseName %> Controller', () => {
  let $controller, $log, $rootScope;
  let controller: <%= upCaseName %>Controller;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$controller_, _$log_, _$rootScope_) => {
      $controller = _$controller_;
      $log = _$log_;
      $rootScope = _$rootScope_;
    });

    controller = $controller('<%= upCaseName %>Controller', {
      $scope: $rootScope.$new()
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(controller).not.toBeUndefined();
      expect(controller).not.toBeNull();
    });

    it('should be an instance of <%= upCaseName %>Controller', () => {
      expect(controller).toEqual(jasmine.any(<%= upCaseName %>Controller));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngController', '<%= upCaseName %>Controller', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });
});
