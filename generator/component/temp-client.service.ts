import ngModuleName from './<%= modName %>.module';

import {BaseRestClient} from '<%= toComponents %>/rest/rest.model';

import {I<%= upCaseName %>} from './<%= fullName %>.model';

'use strict';

const ngServiceName = '<%= fullName %>Client';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q', 'Restangular')
export default class <%= upCaseName %>ClientService extends BaseRestClient <I<%= upCaseName %>> {
  public get baseUrl() { return '<%= fullName %>s'; }

  constructor(private $log: angular.ILogService,
    private $q: angular.IQService,
    protected restangular: restangular.IService) {
    super(restangular);
    $log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }
}
