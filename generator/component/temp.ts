/// <reference path="<%= toComponents %>/../../typings/index.d.ts" />

import ngModuleName from './<%= modName %>'
import <%= upCaseName %>Service from './<%= name %>.service'

'use strict'

let $module = angular.mock.module
let $inject = angular.mock.inject
let $dump = (arg: any): void => console.log(angular.mock.dump(arg))

describe('# <%= upCaseName %> Service', () => {
  let $log, $rootScope
  let service: <%= upCaseName %>Service

  beforeEach(() => {
    $module(ngModuleName)

    $inject((_$log_, _$rootScope_, _<%= fullName %>_) => {
      $log = _$log_
      $rootScope = _$rootScope_
      service = _<%= fullName %>_
    })
  })

  describe('## Existence', () => {
    it('should exist', () => {
      expect(service).not.toBeUndefined()
      expect(service).not.toBeNull()
    })

    it('should be an instance of <%= upCaseName %>Service', () => {
      expect(service).toEqual(jasmine.any(<%= upCaseName %>Service))
    })
  })

  describe('## Log enabled', () => {
    it('should log registration', () => {
      let loaded = ['ngService', '<%= fullName %>', 'loaded'].join(' ')
      expect($log.debug.logs).toContain([loaded])
    })
  })

  describe('## Load Feature', () => {
    it('should load a flag', () => {
      let data
      service.load().then(flag => data = flag)

      // to resolve the promises
      $rootScope.$apply()

      expect(data).toBeTrue()
    })
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
      scope.attr = 'test'
      scope.outside = '2.0'
      scope.$apply()
      var h1 = element.find('h1')
      expect(h1.text()).toBe('Unit Testing AngularJS 2.0')
      var h2 = element.find('h2')
      expect(h2.text()).toBe('test')
    })

    describe('### Controller', () => {
      let controller

      beforeEach(() => {
        controller = element.controller('<%= fullName %>')
      })

      it('should expose test', () => {
        expect(controller.test).toBeDefined()
        expect(controller.test).toBe(true)
      })

      it('should have bindings bound', () => {
        expect(controller.myAttribute).toBeDefined()
        expect(controller.myAttribute).toBe('example')
        expect(controller.myOneWayBinding).toBeDefined()
        expect(controller.myOneWayBinding).toBe('1.5')
      })
    })

  })

  describe('## With $componentController', () => {
    let controller, scope

    beforeEach($inject(($rootScope, $componentController) => {
      scope = $rootScope.$new()
      controller = $componentController('<%= fullName %>', { $scope: scope }, {
        myAttribute: 'example',
        myOneWayBinding: '1.5'
      })
    }))

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller)
    })

    it('should expose test', () => {
      expect(controller.test).toBeDefined()
      expect(controller.test).toBe(true)
    })

    it('should have bindings bound', () => {
      expect(controller.myAttribute).toBeDefined()
      expect(controller.myAttribute).toBe('example')
      expect(controller.myOneWayBinding).toBeDefined()
      expect(controller.myOneWayBinding).toBe('1.5')
    })
  })
})
