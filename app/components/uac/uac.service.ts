import ngModuleName from './uac.module';

'use strict';

interface IAccessControl {
  enable: boolean;
  visible: boolean;
}

const ngServiceName = 'tsfnUac';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q')
export default class UacService {

  constructor(private log: angular.ILogService, private q: angular.IQService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public load(key: string): angular.IPromise<IAccessControl> {
    return this.q.when({
      enable: this.coinFlip(),
      visible: this.coinFlip()
    });
  }

  private coinFlip(): boolean {
    return Math.random() < 0.5;
  }
}
