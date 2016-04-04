import ngModuleName from './post.module';

import {IPost} from './post.model';

'use strict';

const ngServiceName = 'postClient';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q', 'Restangular')
export default class PostClientService {
  private get baseUrl() { return 'posts'; }
  private get basePosts() { return this.restangular.all(this.baseUrl); }

  constructor(private log: angular.ILogService,
    private q: angular.IQService,
    private restangular: restangular.IService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public search(params?) {
    return this.basePosts.getList<IPost>(params);
  }

  public read(id) {
    return this.basePosts.get<IPost>(id);
  }
}
