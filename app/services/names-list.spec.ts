/// <reference path="../../typings/browser.d.ts" />

import {Service} from './names-list';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;

describe('# Names List Service', () => {
  let namesList;

  beforeEach(() => {
    $module(Service.NamesList.moduleName);

    $inject(_NamesList_ => {
      namesList = _NamesList_;
    });
  });

  it('should be an instance of NameList', () => {
    expect(namesList).toEqual(jasmine.any(Service.NamesList));
  });
  it('should have a property names', () => {
    expect(namesList).toHaveArray('names');
  });
  it('should add() a name', () => {
    let lastValue;
    namesList.add('test');
    lastValue = namesList.names.pop();
    expect(lastValue).toEqual('test');
  });
});
