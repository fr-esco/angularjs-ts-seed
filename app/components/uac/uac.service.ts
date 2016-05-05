import ngModuleName from './uac.module';

'use strict';

interface IAccessControl {
  enable: boolean;
  visible: boolean;
}

const ngServiceName = 'tsfnUac';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q', '$http', 'endpoint')
export default class UacService {

  constructor(private log: angular.ILogService,
    private q: angular.IQService,
    private http: angular.IHttpService,
    private endpoint) {
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
    // return this.q.when(this.coinFlip());
    return this.http({
      method: 'GET',
      url: this.endpoint.configPoint,
      params: {
        name: name,
        implication: implication
      }
    }).then(response => response.data['result']);
  }

  private coinFlip(): boolean {
    return Math.random() < 0.5;
  }

  private registerMock() {

  }
}
