/// <reference path="../../../typings/browser.d.ts" />

import <%= upCaseName %> from './<%= name %>';

import <%= upCaseName %>Controller from './<%= name %>.controller';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let expect = chai.expect;

describe('# <%= upCaseName %> Controller', () => {
  let $controller, controller;

  beforeEach(() => {
    // angular.module('ngNewRouter', []);
    // angular.module(Service.NamesList.moduleName);
    $module(<%= upCaseName %>);

    $inject(_$controller_ => {
      $controller = _$controller_;
    });

    controller = $controller('<%= upCaseName %>Controller', { $scope: {} });
  });

  it('should be an instance of <%= upCaseName %>Controller', () => {
    expect(controller).to.be.an.instanceof(<%= upCaseName %>Controller);
  });
  it('should have propertis list, names', () => {
    expect(controller).to.have.property('names');
    expect(controller).to.have.property('list');
  });
  it('should add() a name and update the names list', () => {
    let lastValue;
    controller.addName('test');
    lastValue = controller.names.pop();
    expect(lastValue).to.equal('test');
  });
});
