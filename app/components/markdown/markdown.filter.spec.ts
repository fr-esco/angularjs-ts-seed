/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './markdown';
import MarkdownFilter from './markdown.filter';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Markdown Filter', () => {
  let $log;
  let filter: Function;

  beforeEach($module(ngModuleName));

  beforeEach(() => {
    $inject((_$log_, _$filter_) => {
      $log = _$log_;
      filter = _$filter_('markdown');
    });
  });

  describe('## Log enabled', () => {

    it('should log registration', () => {
      let loaded = ['ngFilter', 'markdown', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });

  describe('## Features', () => {

    it('returns "" when given null', () => {
      expect(filter(null)).toEqual('');
    });

    it('returns the correct value when given a string', () => {
      expect(filter('')).toEqual('');
      expect(filter('abc')).toEqual('<p>abc</p>');
      expect(filter('# abc')).toEqual('<h1>abc</h1>');
    });
  });
});
