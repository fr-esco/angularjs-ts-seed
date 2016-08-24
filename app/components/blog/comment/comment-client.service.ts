import ngModuleName from './comment.module';

import {BaseRestClient} from '../../rest/rest.model';

import {IComment} from './comment.model';

'use strict';

const ngServiceName = 'commentClient';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q', 'Restangular')
export default class CommentClientService extends BaseRestClient<IComment> {
  public get baseUrl() { return 'comments'; }

  constructor(private $log: angular.ILogService,
    private $q: angular.IQService,
    protected restangular: restangular.IService) {
    super(restangular);
    $log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }
}
