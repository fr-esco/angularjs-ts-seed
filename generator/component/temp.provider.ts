import ngModuleName from './<%= modName %>.module';

'use strict';

// the provider will be available as '<%= fullName %>Provider'
// the created service will be available as '<%= fullName %>'
const ngProviderName = '<%= fullName %>';

interface I<%= upCaseName %>Provider extends angular.IServiceProvider {
  makeNoise(value: boolean): void;
}

@at.provider(ngModuleName, ngProviderName)
export class <%= upCaseName %>Provider implements I<%= upCaseName %>Provider {
  private notify = true;

  constructor() {
    this.notify = true;
  }

  public makeNoise(value: boolean): void {
    this.notify = value;
  }

  // $get must be declared as method, not as function property (eg. `$get = () => new Service();`)
  public $get($log: angular.ILogService) {
    'ngInject';
    return new <%= upCaseName %>ProviderService($log, this.notify);
  }
}

export default class <%= upCaseName %>ProviderService {
  constructor(private $log: angular.ILogService, private notify: boolean) {
    let s = ['ngProvider', ngProviderName, 'has loaded an', '<%= upCaseName %>ProviderService'].join(' ');
    if (notify)
      $log.info(s);
    else
      $log.debug(s);
  }
}
