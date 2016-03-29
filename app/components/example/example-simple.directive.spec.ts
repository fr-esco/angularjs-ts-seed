/// <reference path="../../../typings/browser.d.ts" />

import Example from './example';
import ExampleDirective from './example-simple.directive';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Example Simple Directive', () => {
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
    let loaded = ['ngDirective', 'exampleSimple', 'loaded'].join(' ');
    let element = $compile('<example-simple></example-simple>')($rootScope);
    $rootScope.$digest();
    expect($log.debug.logs[1]).toContain(loaded);
  });

  it('should replace the element with the appropriate content', () => {
    // compile a piece of HTML containing the directive
    let element = $compile('<example-simple></example-simple>')($rootScope);

    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();

    // check that the compiled element contains the templated content
    expect(element.html()).toContain('Title written, less than 2 times');
  });
});
