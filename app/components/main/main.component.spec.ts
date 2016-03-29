/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './main';
import MainComponent from './main.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Main Component', () => {
  let log;
  let item = {
    name: 'Table',
    icon: 'view_module',
    sref: '.table',
    link: ['Table']
  };
  let mdSidenav: angular.material.ISidenavService,
    mdBottomSheet: angular.material.IBottomSheetService,
    mdMenu: angular.material.IMenuService,
    mdToast: angular.material.IToastService;
  let leftClose, rightClose;
<<<<<<< HEAD
=======
  let leftToggle, rightToggle;
>>>>>>> origin/develop

  beforeEach(() => {
    $module(ngModuleName);

    $module($provide => {
      $provide.service('navigationService', ['$q', function($q) {
        this.loadAllItems = () => $q.when([item]);
      }]);
      $provide.factory('$mdSidenav', ['$q', $q => {
        let cache = [];
        return direction => {
          return cache[direction] || (cache[direction] = {
<<<<<<< HEAD
            close: () => $q.when(true)
=======
            close: () => $q.when(true),
            toggle: () => $q.when(true)
>>>>>>> origin/develop
          });
        };
      }]);
    });

  });

  describe('## With $componentController', () => {
    let controller, scope;

    beforeEach($inject(($log, $rootScope, $componentController,
<<<<<<< HEAD
      $mdBottomSheet, $mdSidenav) => {
=======
      $mdBottomSheet, $mdMenu, $mdSidenav, $mdToast) => {
>>>>>>> origin/develop
      log = $log;
      scope = $rootScope.$new();

      mdBottomSheet = $mdBottomSheet;
      spyOn(mdBottomSheet, 'hide').and.callThrough();
<<<<<<< HEAD
=======
      spyOn(mdBottomSheet, 'show').and.callThrough();

      mdMenu = $mdMenu;
      spyOn(mdMenu, 'hide').and.callThrough();
>>>>>>> origin/develop

      mdSidenav = $mdSidenav;
      leftClose = spyOn($mdSidenav('left'), 'close').and.callThrough();
      rightClose = spyOn($mdSidenav('right'), 'close').and.callThrough();
<<<<<<< HEAD
=======
      leftToggle = spyOn($mdSidenav('left'), 'toggle').and.callThrough();
      rightToggle = spyOn($mdSidenav('right'), 'toggle').and.callThrough();

      mdToast = $mdToast;
      spyOn(mdToast, 'simple').and.callThrough();
      spyOn(mdToast, 'show').and.callThrough();
>>>>>>> origin/develop

      controller = $componentController('tsfnMain', { $scope: scope, $mdSidenav: mdSidenav });
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should log registration', () => {
      let loaded = ['ngComponent', 'tsfnMain', 'loaded'].join(' ');
      expect(log.debug.logs).toContain([loaded]);
    });

    it('should be init', () => {
      expect(controller.menuItems).toBeEmptyArray();

      controller.$onInit();
      scope.$apply();

      expect(controller.menuItems).toBeNonEmptyArray();
      controller.menuItems.forEach(item => {
        expect(item).toHaveNonEmptyString('name');
        expect(item).toHaveNonEmptyString('icon');
        expect(item).toHaveNonEmptyString('sref');
        expect(item).toHaveNonEmptyArray('link');
      });
    });

    it('should select items', () => {
      expect(controller.title).toBeUndefined();

      controller.selectItem(item);
      scope.$apply();

      expect(controller.title).toBe(item.name);
      expect(mdBottomSheet.hide).toHaveBeenCalled();
<<<<<<< HEAD
=======
    });

    it('should clear sidebars', () => {
      controller.clearSidebars();
      scope.$apply();

      expect(mdBottomSheet.hide).toHaveBeenCalled();
>>>>>>> origin/develop

      expect(leftClose).toHaveBeenCalled();
      expect(rightClose).toHaveBeenCalled();
      expect(log.debug.logs).toContain(['Left sidenav closed']);
      expect(log.debug.logs).toContain(['Right sidenav closed']);
<<<<<<< HEAD

      // TODO showSimpleToast
=======
    });

    it('should show toast', () => {
      controller.selectItem(item);
      scope.$apply();

      expect(mdToast.simple).toHaveBeenCalled();
      expect(mdToast.show).toHaveBeenCalled();
    });

    it('should toggle left sidebar', () => {
      controller.toggleItemsList();
      scope.$apply();

      expect(mdBottomSheet.hide).toHaveBeenCalled();
      expect(leftToggle).toHaveBeenCalled();
      expect(log.debug.logs).toContain(['Left sidenav toggled']);
    });

    it('should toggle right sidebar', () => {
      controller.toggleRightSidebar();
      scope.$apply();

      expect(mdMenu.hide).toHaveBeenCalled();
      expect(rightToggle).toHaveBeenCalled();
      expect(log.debug.logs).toContain(['Right sidenav toggled']);
    });

    it('should show actions', () => {
      controller.showActions(new MouseEvent('click'));
      scope.$apply();

      expect(mdBottomSheet.show).toHaveBeenCalled();
>>>>>>> origin/develop
    });
  });
});
