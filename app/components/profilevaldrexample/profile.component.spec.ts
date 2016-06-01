/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './profilevaldr';
import ProfileComponent from './profilevaldr.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Profile Component', () => {
  let log;

  beforeEach($module(ngModuleName));

  describe('## With $componentController', () => {
    let controller, scope, httpBackend;

    beforeEach($inject(($log, $rootScope, $componentController, $httpBackend) => {
      log = $log;
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      controller = $componentController('tsfnProfileValdr', { $scope: scope });
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should log registration', () => {
      let loaded = ['ngModule', 'app.components.profilevaldrexample', 'loaded'].join(' ');
      expect(log.debug.logs).toContain([loaded]);
    });

    it('should have title', () => {
      let title = 'Profile';
      httpBackend.expectGET('./components/profilevaldrexample/constraints.json').respond(200, {});
      controller.$routerOnActivate({ routeData: { data: { title: title } } });
      scope.$apply();
      expect(controller.title).toBe(title);
    });

    it('should have user', () => {
      expect(controller.user).toBeNonEmptyObject();
      expect(controller.user).toHaveNonEmptyString('title');
      expect(controller.user).toHaveNonEmptyString('email');
      expect(controller.user).toHaveEmptyString('firstName');
      expect(controller.user).toHaveEmptyString('lastName');
      expect(controller.user).toHaveNonEmptyString('company');
      expect(controller.user).toHaveNonEmptyString('address');
      expect(controller.user).toHaveNonEmptyString('city');
      expect(controller.user).toHaveEmptyString('state');
      expect(controller.user).toHaveNonEmptyString('biography');
      expect(controller.user).toHaveNonEmptyString('postalCode');
    });
  });
});
