/// <reference path="../../../typings/index.d.ts" />

import ngModuleName from './exception'
import {ExceptionHandlerProvider} from './exception-handler.provider'
import ExceptionHandlerService from './exception-handler.provider'

'use strict'

let $module = angular.mock.module
let $inject = angular.mock.inject
let $dump = (arg: any): void => console.log(angular.mock.dump(arg))

describe('# ExceptionHandler Provider', () => {
  const loaded = ['ngProvider', 'exceptionHandler', 'has loaded an', 'ExceptionHandlerProviderService'].join(' ')

  // $log.debug.logs[0] will contain the module initialization logs
  let $log
  let provider: ExceptionHandlerProvider
  let service: ExceptionHandlerService

  describe('## Existence of provider', () => {

    beforeEach(() => {
      $module(ngModuleName, exceptionHandlerProvider => {
        provider = exceptionHandlerProvider
      })

      // without injecting the service, the provider is not instantiated
      $inject(_exceptionHandler_ => {
        service = _exceptionHandler_
      })
    })

    it('should exist', () => {
      expect(provider).not.toBeUndefined()
      expect(provider).not.toBeNull()
    })

    it('should be an instance of ExceptionHandlerProvider', () => {
      expect(provider).toHaveMethod('$get')
      expect(provider).toHaveMethod('decorate')
    })
  })

  describe('## Existence of service', () => {

    beforeEach(() => {
      $module(ngModuleName)

      $inject(_exceptionHandler_ => {
        service = _exceptionHandler_
      })
    })

    it('should exist', () => {
      expect(service).not.toBeUndefined()
      expect(service).not.toBeNull()
    })

    it('should be an instance of SampleService', () => {
      expect(service).toEqual(jasmine.any(ExceptionHandlerService))
    })
  })
})
