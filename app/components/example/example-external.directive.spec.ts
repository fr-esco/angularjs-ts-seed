/// <reference path="../../../typings/browser.d.ts" />

import Example from './example';
import ExampleDirective from './example-external.directive';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Example External Directive', () => {
  let $log, $compile, $rootScope, httpBackend;

  beforeEach(() => {
    $module(Example);

    $inject((_$log_, _$compile_, _$rootScope_, $httpBackend) => {
      $log = _$log_;
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      httpBackend = $httpBackend;
    });
  });

  it('should log registration', () => {
    let loaded = ['ngModule', 'app.components.example', 'loaded'].join(' ');
    let element = $compile('<example-external></example-external>')($rootScope);

    httpBackend.expectGET('example/example-external.directive.html').respond(200, {});

    $rootScope.$digest();
    expect($log.debug.logs[0]).toContain(loaded);
  });

  /*it('should replace the element with the appropriate content', () => {
    // compile a piece of HTML containing the directive
    let element = $compile('<example-external></example-external>')($rootScope);
    // fire all the watches
    $rootScope.$digest();

    // check that the compiled element contains the templated content
    expect(element.html()).toEqual('true');
  });*/
});
