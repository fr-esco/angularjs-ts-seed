import ngModuleName from './<%= modName %>.module'

'use strict'

const ngControllerName = '<%= upCaseName %>Controller'

@at.controller(ngModuleName, ngControllerName)
export default class <%= upCaseName %>Controller {

  constructor(private $log: angular.ILogService) {
    'ngInject'
    $log.debug(['ngController', ngControllerName, 'loaded'].join(' '))
  }

}
