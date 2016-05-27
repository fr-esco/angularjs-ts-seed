/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './notificationexample';
import NotificationComponent from './notificationexample.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

xdescribe('# Notification Component', () => {
  let log;

  beforeEach($module(ngModuleName));

  describe('## With $componentController', () => {
    let controller, scope;

    beforeEach($inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('tsfnNotificationExample', { $scope: scope }, {
        myAttribute: 'example',
        myOneWayBinding: '1.5'
      });
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should expose test', () => {
      expect(controller.test).toBeDefined();
      expect(controller.test).toBe(true);
    });

    it('should have bindings bound', () => {
      expect(controller.myAttribute).toBeDefined();
      expect(controller.myAttribute).toBe('example');
      expect(controller.myOneWayBinding).toBeDefined();
      expect(controller.myOneWayBinding).toBe('1.5');
    });
  });
});
