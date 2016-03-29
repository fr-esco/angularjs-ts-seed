/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './showcase';
import ShowcaseComponent from './showcase.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

xdescribe('# Showcase Component', () => {
  let log;

  beforeEach($module(ngModuleName));

  describe('## With $compile', () => {
    let element, scope;

    beforeEach($inject(($log, $compile, $rootScope) => {
      log = $log;
      scope = $rootScope.$new();
      element = angular.element('<tsfn-showcase my-attribute="{{attr}}" my-one-way-binding="outside"></tsfn-showcase>');
      element = $compile(element)(scope);
      scope.attr = 'example';
      scope.outside = '1.5';
      scope.$apply();
    }));

    it('should log registration', () => {
      let loaded = ['ngComponent', 'tsfnShowcase', 'loaded'].join(' ');
      expect(log.debug.logs).toContain([loaded]);
    });

    it('should render the text', () => {
      var h1 = element.find('h1');
      expect(h1.text()).toBe('Unit Testing AngularJS 1.5');
      var h2 = element.find('h2');
      expect(h2.text()).toBe('example');
      var p = element.find('p');
      expect(p.text()).toBe('true');
    });

    it('should update the rendered text when the parent scope changes', () => {
      scope.attr = 'test';
      scope.outside = '2.0';
      scope.$apply();
      var h1 = element.find('h1');
      expect(h1.text()).toBe('Unit Testing AngularJS 2.0');
      var h2 = element.find('h2');
      expect(h2.text()).toBe('test');
    });

    describe('### Controller', () => {
      let controller;

      beforeEach(() => {
        controller = element.controller('tsfnShowcase');
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

  describe('## With $componentController', () => {
    let controller, scope;

    beforeEach($inject(($rootScope, $componentController) => {
      scope = $rootScope.$new();
      controller = $componentController('tsfnShowcase', { $scope: scope }, {
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
