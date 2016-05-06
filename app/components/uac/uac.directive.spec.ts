/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './uac';
import UacDirective from './uac.directive';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

xdescribe('# Uac Directive', () => {
  let $log, $compile, $rootScope;

  beforeEach(() => {
    $module(ngModuleName);

    $inject((_$log_, _$compile_, _$rootScope_) => {
      $log = _$log_;
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  it('should log registration', () => {
    let loaded = ['ngDirective', 'tsfnUac', 'loaded'].join(' ');
    let element = $compile('<div tsfn-uac></div>')($rootScope);
    $rootScope.$digest();
    expect($log.debug.logs).toContain([loaded]);
  });

  it('should fill the element with the appropriate content', () => {
    // compile a piece of HTML containing the directive
    let element = $compile('<div tsfn-uac></div>')($rootScope);

    // fire all the watches
    $rootScope.$digest();

    // check that the compiled element contains the templated content
    expect(angular.element(element).children().eq(0).html()).toEqual('true');
  });
});
