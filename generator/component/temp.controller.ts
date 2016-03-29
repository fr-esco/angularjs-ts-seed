import ngModuleName from './<%= modName %>.module';

'use strict';

const ngControllerName = '<%= upCaseName %>Controller';

@at.controller(ngModuleName, ngControllerName)
@at.inject('$log')
export default class <%= upCaseName %>Controller {

  constructor(private log: angular.ILogService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));
  }

}
