/// <reference path="../../../../../typings/browser.d.ts" />

import ngModuleName from './widget';
import MemoryController from './memory.controller';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Memory Controller', () => {
  let $controller, $log, $rootScope;
  let controller: MemoryController;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$controller_, _$log_, _$rootScope_) => {
      $controller = _$controller_;
      $log = _$log_;
      $rootScope = _$rootScope_;
    });

    controller = $controller('MemoryController', {
      $scope: $rootScope.$new()
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(controller).not.toBeUndefined();
      expect(controller).not.toBeNull();
    });

    it('should be an instance of MemoryController', () => {
      expect(controller).toEqual(jasmine.any(MemoryController));
    });

    it('should have properties', () => {
      expect(controller.memoryChartData).toBeArrayOfObjects();
      expect(controller.memoryChartData).toBeArrayOfSize(2);
      controller.memoryChartData.forEach(data => {
        expect(data).toHaveString('key');
        expect(data).toHaveNumber('y');
      });

      expect(controller.chartOptions).toHaveNonEmptyObject('chart');
      expect(controller.chartOptions.chart).toHaveNonEmptyString('type');
      expect(controller.chartOptions.chart).toHaveNonEmptyObject('pie');
      expect(controller.chartOptions.chart.pie).toHaveMethod('startAngle');
      expect(controller.chartOptions.chart.pie).toHaveMethod('endAngle');
      expect(controller.chartOptions.chart).toHaveMethod('x');
      expect(controller.chartOptions.chart).toHaveMethod('y');
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngController', 'MemoryController', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });
});
