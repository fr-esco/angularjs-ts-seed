import ngModuleName from './<%= modName %>.module';

'use strict';

const ngServiceName = '<%= name %>';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q')
export default class <%= upCaseName %>Service {

  constructor(private log: angular.ILogService, private q: angular.IQService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public load(): angular.IPromise<boolean> {
    return this.q.when(true);
  }
}
