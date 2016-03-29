import ngModuleName from './widget.module';
import {IUsageData} from './usage.model';

'use strict';

const ngServiceName = 'usageService';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q')
export default class UsageService {

  constructor(private log: angular.ILogService, private q: angular.IQService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public getRamData(): ng.IPromise<IUsageData[]> {
    return this.q.when([{ key: 'Memory', y: 768660 }, { key: 'Cache', y: 367404 }, { key: 'Swap', y: 41924 }]);
  }

  public getStorageData(): ng.IPromise<IUsageData[]> {
    return this.q.when([{ key: 'System', y: 126560 }, { key: 'Other', y: 224365 }]);
  }
}
