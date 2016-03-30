/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './showcase';
import ShowcaseComponent from './showcase.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Showcase Component', () => {
  let log;

  beforeEach($module(ngModuleName));

  describe('## With $componentController', () => {
    let controller, scope, service;

    beforeEach($inject(($rootScope, $componentController, showcase) => {
      scope = $rootScope.$new();
      service = showcase;
      controller = $componentController('tsfnShowcase', { $scope: scope, showcase: service }, {
        fileList: ['example.html', 'example.ts', 'example.css'],
        title: 'Showcase'
      });
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should expose properties', () => {
      expect(controller.showSource).toBe(false);
      expect(controller.selected).toBe(0);
      expect(controller.tabs).toBeEmptyArray();

      expect(controller.loaded).toBe(false);
      expect(controller.loading).toBe(false);
    });

    it('should have bindings bound', () => {
      expect(controller.fileList).toBeArrayOfStrings();
      expect(controller.fileList).toBeArrayOfSize(3);
      expect(controller.lazy).toBeUndefined();
      expect(controller.title).toBeNonEmptyString();
    });

    describe('### Lazy Feature', () => {
      beforeEach(() => {
        spyOn(controller, 'load');
      });

      it('should load sources', () => {
        controller.$onInit();
        expect(controller.load).toHaveBeenCalled();
      });

      it('should not load sources', () => {
        controller.lazy = true;
        controller.$onInit();
        expect(controller.load).not.toHaveBeenCalled();
      });
    });

    it('should toggle source', () => {
      spyOn(controller, 'toggleSourceInternal').and.callThrough();

      controller.loaded = true;
      controller.toggleSource();
      scope.$apply();

      expect(controller.toggleSourceInternal).toHaveBeenCalled();
      expect(controller.showSource).toBe(true);
    });

    it('should not toggle source', $inject($q => {
      spyOn(controller, 'load').and.callFake(() => $q.when(false));
      spyOn(controller, 'toggleSourceInternal').and.callThrough();

      controller.loaded = true;
      controller.toggleSource();
      scope.$apply();

      expect(controller.toggleSourceInternal).not.toHaveBeenCalled();
      expect(controller.showSource).toBe(false);
    }));

    describe('### Load Feature', () => {
      beforeEach($inject($q => {
        spyOn(controller, 'load').and.callThrough();
        spyOn(service, 'load').and.callFake(() => $q.when(controller.fileList.reduce((obj, file) => (obj[file] = file) && obj, {})));
      }));

      it('should load sources', $inject($timeout => {
        expect(controller.loaded).toBe(false);
        expect(controller.loading).toBe(false);

        controller.$onInit();
        expect(controller.load).toHaveBeenCalled();

        scope.$apply();

        expect(controller.loading).toBe(true);
        expect(service.load).toHaveBeenCalledWith(controller.fileList);
        expect(controller.tabs).toBeNonEmptyArray();
        controller.tabs.forEach(tab => {
          expect(tab).toHaveNonEmptyString('title');
          expect(tab).toHaveNonEmptyObject('options');
          expect(tab.options).toHaveMember('mode');
          expect(tab.options).toHaveNonEmptyString('theme');
          expect(tab.options.theme).toBe('material');
          expect(tab.options).toHaveBoolean('lineNumbers');
          expect(tab.options.lineNumbers).toBe(true);
          expect(tab.options).toHaveBoolean('readOnly');
          expect(tab.options.readOnly).toBe(true);
          expect(tab.options).toHaveBoolean('autoRefresh');
          expect(tab.options.autoRefresh).toBe(true);
          expect(tab).toHaveNonEmptyString('content');
        });
        expect(controller.loaded).toBe(true);

        $timeout.flush(200);
        expect($timeout.verifyNoPendingTasks).toThrow();
        $timeout.flush(45);
        expect($timeout.verifyNoPendingTasks).not.toThrow();

        scope.$apply();
        expect(controller.loading).toBe(false);
      }));

    });
  });
});
