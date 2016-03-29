/// <reference path="../../../typings/browser.d.ts" />

import {Feature1} from './feature1';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;

describe('# Feature1 Controller', () => {
  let $controller, $scope, controller;

  beforeEach(() => {
    $module(Feature1.moduleName);

    $inject(_$controller_ => {
      $controller = _$controller_;
    });

    controller = $controller('Feature1Controller', { $scope: {} });
  });

  it('should be an instance of Feature1Controller', () => {
    expect(controller).toEqual(jasmine.any(Feature1.Feature1Controller));
  });
  it('should have propertis list, names', () => {
    expect(controller).toHaveArray('names');
    expect(controller).toHaveNonEmptyObject('list');
  });
  it('should add() a name and update the names list', () => {
    let lastValue;
    controller.addName('test');
    lastValue = controller.names.pop();
    expect(lastValue).toEqual('test');
  });
});
