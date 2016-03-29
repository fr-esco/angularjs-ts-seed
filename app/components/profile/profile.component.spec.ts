/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './profile';
import ProfileComponent from './profile.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Profile Component', () => {
  let log;

  beforeEach($module(ngModuleName));

  describe('## With $componentController', () => {
    let controller, scope;

    beforeEach($inject(($log, $rootScope, $componentController) => {
      log = $log;
      scope = $rootScope.$new();
      controller = $componentController('tsfnProfile', { $scope: scope });
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should log registration', () => {
      let loaded = ['ngComponent', 'tsfnProfile', 'loaded'].join(' ');
      expect(log.debug.logs).toContain([loaded]);
    });

    it('should have title', () => {
      let title = 'Profile';
      controller.$routerOnActivate({ routeData: { data: { title: title } } });
      scope.$apply();
      expect(controller.title).toBe(title);
    });

    it('should have file configuration', () => {
      expect(controller.files).toBeArrayOfSize(3);
      controller.files.forEach(x => {
        expect(x).toStartWith('components/');
      });
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
