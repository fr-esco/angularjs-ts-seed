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

  public loadConfigPoint(name: string, implication: string): angular.IPromise<boolean> {
    this.log.debug('loadConfigPoint', name, implication);
    // return this.q.when(true);
    // return this.q.when(false);
    return this.q.when(this.coinFlip());
  }

  private coinFlip(): boolean {
    return Math.random() < 0.5;
  }
}
