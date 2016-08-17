/// <reference path="../../../../../typings/browser.d.ts" />

import ngModuleName from './widget';
import ControlPanelController from './control-panel.controller';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# ControlPanel Controller', () => {
  let $controller, $interval, $log, $rootScope;
  let controller: ControlPanelController;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$controller_, _$interval_, _$log_, _$rootScope_) => {
      $controller = _$controller_;
      $interval = _$interval_;
      $log = _$log_;
      $rootScope = _$rootScope_;
    });

    controller = $controller('ControlPanelController', {
      $scope: $rootScope.$new()
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(controller).not.toBeUndefined();
      expect(controller).not.toBeNull();
    });

    it('should be an instance of ControlPanelController', () => {
      expect(controller).toEqual(jasmine.any(ControlPanelController));
    });

    it('should have properties', () => {
      expect(controller.buttonEnabled).toBe(false);
      expect(controller.determinateValue).toBe(10);
      expect(controller.reloadServer).toBe('Staging');
      expect(controller.showProgress).toBe(false);
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngController', 'ControlPanelController', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });

  describe('## Progress Feature', () => {
    let mdDialog;

    beforeEach($inject(($q, _$mdDialog_) => {
      mdDialog = _$mdDialog_;

      spyOn(mdDialog, 'alert').and.callThrough();
      spyOn(mdDialog, 'show').and.callFake(() => $q.when(true));
    }));

    it('should perform progress', () => {
      controller.performProgress();

      expect(controller.showProgress).toBe(true);

      $interval.flush(4000);
      expect(controller.determinateValue).toBe(90);
      expect(controller.showProgress).toBe(true);

      $interval.flush(550);
      expect(controller.determinateValue).toBe(10);
      expect(controller.showProgress).toBe(false);
      expect(mdDialog.alert).toHaveBeenCalled();
      expect(mdDialog.show).toHaveBeenCalled();

      $rootScope.$apply();
    });
  });
});
