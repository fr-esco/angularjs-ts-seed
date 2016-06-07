/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './form';
import FormComponent from './form.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Form Component', () => {
  let log;

  beforeEach($module(ngModuleName));

  describe('## With $compile', () => {
    let element, scope, httpBackend;

    beforeEach($inject(($log, $compile, $rootScope, $httpBackend) => {
      log = $log;
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      element = angular.element('<tsfn-form my-attribute="{{attr}}" my-one-way-binding="outside"></tsfn-form>');
      element = $compile(element)(scope);
      scope.attr = 'example';
      scope.outside = '1.5';
      httpBackend.expectGET('form/form.component.html').respond(200, {});
      scope.$apply();
    }));

    it('should log registration', () => {
      let loaded = ['ngModule', 'app.components.form', 'loaded'].join(' ');
      expect(log.debug.logs).toContain([loaded]);
    });

    describe('### Controller', () => {
      let controller;

      beforeEach(() => {
        controller = element.controller('tsfnForm');
      });
    });

  });

  describe('## With $componentController', () => {
    let controller, scope, httpBackend;

    beforeEach($inject(($rootScope, $componentController, $httpBackend) => {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      controller = $componentController('tsfnForm', { $scope: scope }, {
        myAttribute: 'example',
        myOneWayBinding: '1.5'
      });
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should expose test', () => {
      httpBackend.expectGET('./components/form/form.component.html').respond(200, {});
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
