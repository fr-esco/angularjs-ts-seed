import ngModuleName from './<%= modName %>.module'

'use strict'

const ngServiceName = '<%= fullName %>'

@at.service(ngModuleName, ngServiceName)
export default class <%= upCaseName %>Service {

  constructor(private $log: angular.ILogService, private $q: angular.IQService) {
    'ngInject'
    $log.debug(['ngService', ngServiceName, 'loaded'].join(' '))
  }

  public load(): angular.IPromise<boolean> {
    return this.$q.when(true)
  }
}
