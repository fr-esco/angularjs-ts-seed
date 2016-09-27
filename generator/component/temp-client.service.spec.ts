/// <reference path="<%= toComponents %>/../../typings/index.d.ts" />

import ngModuleName from './<%= modName %>'
import <%= upCaseName %>ClientService from './<%= name %>-client.service'

'use strict'

let $module = angular.mock.module
let $inject = angular.mock.inject
let $dump = (arg: any): void => console.log(angular.mock.dump(arg))

describe('# <%= upCaseName %>Client Service', () => {
  let $log, $rootScope
  let service: <%= upCaseName %>ClientService

  beforeEach(() => {
    $module(ngModuleName)

    $inject((_$log_, _$rootScope_, _<%= fullName %>Client_) => {
      $log = _$log_
      $rootScope = _$rootScope_
      service = _<%= fullName %>Client_
    })
  })

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined()
      expect(service).not.toBeNull()
    })

    it('should be an instance of <%= upCaseName %>ClientService', () => {
      expect(service).toEqual(jasmine.any(<%= upCaseName %>ClientService))
    })
  })

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', '<%= fullName %>Client', 'loaded'].join(' ')
      expect($log.debug.logs).toContain([loaded])
    })
  })

})
