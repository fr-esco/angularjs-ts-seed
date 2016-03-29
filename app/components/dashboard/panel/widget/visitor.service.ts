import ngModuleName from './widget.module';
import {IVisitor} from './visitor.model';

'use strict';

const ngServiceName = 'visitorService';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q')
export default class VisitorService {

  constructor(private log: angular.ILogService, private q: angular.IQService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public getVisitorData(): ng.IPromise<IVisitor[]> {
    return this.q.when([{ key: 'Mobile', y: 5264 }, { key: 'Desktop', y: 3872 }]);
  }

}
