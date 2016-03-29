/// <reference path="../../../typings/browser.d.ts" />

import Example from './example';
import ExampleDirective from './example-external.directive';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Example External Directive', () => {
  let $log, $compile, $rootScope;

  beforeEach(() => {
    $module(Example);

    $inject((_$log_, _$compile_, _$rootScope_) => {
      $log = _$log_;
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  it('should log registration', () => {
    let loaded = ['ngDirective', 'exampleExternal', 'loaded'].join(' ');
    let element = $compile('<example-external></example-external>')($rootScope);
    $rootScope.$digest();
    expect($log.debug.logs[1]).toContain(loaded);
  });

  it('should replace the element with the appropriate content', () => {
    // compile a piece of HTML containing the directive
    let element = $compile('<example-external></example-external>')($rootScope);

    // fire all the watches
    $rootScope.$digest();

    // check that the compiled element contains the templated content
    expect(element.html()).toEqual('true');
  });
});
