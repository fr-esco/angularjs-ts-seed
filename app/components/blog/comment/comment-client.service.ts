import ngModuleName from './comment.module';

import {IComment} from './comment.model';

'use strict';

const ngServiceName = 'commentClient';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q', 'Restangular')
export default class CommentClientService {
  public get baseUrl() { return 'comments'; }
  public get baseList() { return this.restangular.all(this.baseUrl); }

  public baseElement(id: number) { return this.restangular.one(this.baseUrl, id); }

  constructor(private log: angular.ILogService,
    private q: angular.IQService,
    private restangular: restangular.IService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public search(params?) {
    return this.baseList.getList<IComment>(params);
  }

  public read(id: number) {
    return this.baseList.get<IComment>(id);
  }

}
