/// <reference path="../../../typings/index.d.ts" />

import Rest from './rest'

'use strict'

let $module = angular.mock.module
let $inject = angular.mock.inject
let $dump = (arg: any): void => console.log(angular.mock.dump(arg))

describe('# Rest Module', () => {
  beforeEach($module(Rest))

  describe('## Existence', () => {
    let mod

    beforeEach(() => mod = angular.module(Rest))

    it('should exist', () => {
      expect(mod).not.toBeUndefined()
      expect(mod).not.toBeNull
    })

    it('should have deps', () => {
      expect(mod.requires).toContain('restangular')
    })
  })

  describe('## Log enabled', () => {
    let $log

    beforeEach(() => {
      $inject(_$log_ => {
        $log = _$log_
      })
    })

    it('should log registration', () => {
      let loaded = ['ngModule', Rest, 'loaded'].join(' ')
      expect($log.debug.logs).toContain([loaded])
    })
  })

  describe('## Log disabled', () => {
    let $log

    beforeEach(() => {
      $module($logProvider => {
        $logProvider.debugEnabled(false)
      })

      $inject(_$log_ => {
        $log = _$log_
      })
    })

    it('should not log registration', () => {
      expect($log.assertEmpty).not.toThrow()
    })
  })
})
