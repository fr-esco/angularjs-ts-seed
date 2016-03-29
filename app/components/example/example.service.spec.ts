/// <reference path="../../../typings/browser.d.ts" />

import Example from './example';
import ExampleService from './example.service';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# Example Service', () => {
  let $log;
  let service: ExampleService;

  beforeEach(() => {
    $module(Example);

    $inject((_$log_, _example_) => {
      $log = _$log_;
      service = _example_;
    });
  });

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined();
      expect(service).not.toBeNull();
    });

    it('should be an instance of ExampleService', () => {
      expect(service).toEqual(jasmine.any(ExampleService));
    });
  });

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', 'example', 'loaded'].join(' ');
      expect($log.debug.logs).toContain([loaded]);
    });
  });

  describe('## Date management', () => {
    it('should display happy new year messsage', () => {
      service.nowTime = angular.mock.TzDate(0, '2015-01-01T00:00:00Z');
      service.nextYear = 2015;
      // $dump(service.dumpDate(service.nowTime, false));
      expect(service.message).toBe('Happy new Year!');
    });

    it('should display almost new year message', () => {
      // for the time I am providing, the UTC time is +1 hour ahead
      service.nowTime = angular.mock.TzDate(+1, '2014-12-31T23:00:00Z');
      service.nextYear = 2015;
      // $dump(service.dumpDate(service.nowTime, false));
      expect(service.message).toBe('Keep on counting down...!');
    });

    it('should dump as string', () => {
      service.nowTime = angular.mock.TzDate(+1, '2014-12-31T23:00:00Z');
      expect(service.dumpDate(service.nowTime, false)).toBeString();
      expect(service.dumpDate(service.nowTime, false).split('\n')).toBeArrayOfStrings();
      expect(service.dumpDate(service.nowTime, false).split('\n')).toBeArrayOfSize(4);
    });

    it('should dump as debug logs', () => {
      service.nowTime = angular.mock.TzDate(+1, '2014-12-31T23:00:00Z');
      let info = service.dumpDate(service.nowTime).split('\n');
      expect(service.dumpDate(service.nowTime, true).split('\n')).toBeArrayOfSize(4);
      info.forEach(x => expect($log.debug.logs).toContain([x]));
    });

    it('should increment the time by the given hours', () => {
      var base = angular.mock.TzDate(+1, '2014-12-31T23:00:00Z');

      // setTime is not available for angular.mock.TzDate
      spyOn(base, 'setTime');

      service.addHours(base, 1);
      expect(base.setTime).toHaveBeenCalledWith(1420070400000);
    });
  });
});
