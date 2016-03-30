/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './bottom-sheet';
import BottomSheetController from './bottom-sheet.controller';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# BottomSheet Controller', () => {
  let $controller, $log, $rootScope;
  let mdBottomSheet: angular.material.IBottomSheetService;
  let controller: BottomSheetController;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$controller_, _$log_, _$rootScope_, _$mdBottomSheet_) => {
      $controller = _$controller_;
      $log = _$log_;
      $rootScope = _$rootScope_;

      mdBottomSheet = _$mdBottomSheet_;
      spyOn(mdBottomSheet, 'hide').and.callThrough();
    });

    controller = $controller('BottomSheetController', {
      $scope: $rootScope.$new()
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(controller).not.toBeUndefined();
      expect(controller).not.toBeNull();
    });

    it('should be an instance of BottomSheetController', () => {
      expect(controller).toEqual(jasmine.any(BottomSheetController));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngController', 'BottomSheetController', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });

  describe('## Features', () => {
    it('should have actions', () => {
      expect(controller).toHaveArrayOfObjects('actions');
      controller.actions.forEach(action => {
        expect(action).toHaveString('name');
        expect(action).toHaveString('icon');
        expect(action).toHaveString('url');
      });
    });

    it('should perform actions', () => {
      let action = controller.actions[0];
      controller.performAction(action);

      expect(mdBottomSheet.hide).toHaveBeenCalledWith(action);
    });
  });
});
