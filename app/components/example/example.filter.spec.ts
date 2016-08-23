/// <reference path="../../../typings/index.d.ts" />

import Example from './example';
import ExampleFilter from './example.filter';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Example Filter', () => {
  let $log;
  let filter: Function;

  beforeEach($module(Example));

  beforeEach(() => {
    $inject((_$log_, _$filter_) => {
      $log = _$log_;
      filter = _$filter_('example');
    });
  });

  describe('## Log enabled', () => {

    it('should log registration', () => {
      let loaded = ['ngFilter', 'example', 'loaded'].join(' ');
      expect($log.debug.logs[1]).toContain(loaded);
    });
  });

  describe('## Features', () => {

    it('returns 0 when given null', () => {
      expect(filter(null)).toEqual(0);
    });

    it('returns the correct value when given a string of chars', () => {
      expect(filter('')).toEqual(0);
      expect(filter('abc')).toEqual(3);
    });

    it('returns the correct value when given an array', () => {
      expect(filter([])).toEqual(0);
      expect(filter(['a', 1, 'asd', {}])).toEqual(4);
    });
  });
});
