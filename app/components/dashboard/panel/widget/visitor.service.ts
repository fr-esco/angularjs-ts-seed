import {IVisitor} from './visitor.model'
import ngModuleName from './widget.module'

'use strict'

const ngServiceName = 'visitorService'

@at.service(ngModuleName, ngServiceName)
export default class VisitorService {

  constructor(private $log: angular.ILogService, private $q: angular.IQService) {
    'ngInject'
    $log.debug(['ngService', ngServiceName, 'loaded'].join(' '))
  }

  public getVisitorData(): ng.IPromise<IVisitor[]> {
    return this.$q.when([{ key: 'Mobile', y: 5264 }, { key: 'Desktop', y: 3872 }])
  }

}
