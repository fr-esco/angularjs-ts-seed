/// <reference path="../../../typings/browser.d.ts" />

import {Home} from './home';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;

describe('# Home Controller', () => {
  let $controller, $scope, controller;

  beforeEach(() => {
    $module(Home.moduleName);

    $inject(_$controller_ => {
      $controller = _$controller_;
    });

    controller = $controller('HomeController', { $scope: {} });
  });

  it('should be an instance of HomeController', () => {
    expect(controller).toEqual(jasmine.any(Home.HomeController));
  });
});
