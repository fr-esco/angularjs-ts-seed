import ngModuleName from './profilevaldr.module';
'use strict';

const ngServiceName = 'asyncCustomValidator';

@at.provider(ngModuleName, ngServiceName)
export class AsyncCustomValidator implements angular.IServiceProvider {
  public name = 'usernameV';

  constructor() {
    this.name = 'usernameV';
    console.log('Provider: ' + ngServiceName + ' loaded');

  }

  @at.injectMethod('$q', '$timeout')
  public $get(
    q: angular.IQService,
    timeout: angular.ITimeoutService) {
    return new LocaleProviderService(q, timeout);
  }
}
export default class LocaleProviderService {
  public name = 'usernameV';

  constructor(
    private q: angular.IQService,
    private timeout: angular.ITimeoutService) {
    this.name = 'usernameV';
  }
  public validate(value, constraint) {

    var usernames = ['JohnJohn_88', 'Peter_77', 'usernameEx'];

    var def = this.q.defer();
    this.timeout(() => {
      // Mock a delayed response
      if (usernames.indexOf(value) === -1) {
        def.resolve(true);
      } else
        def.reject(def.resolve(false));
    }, 2000);
    var r;
    def.promise.then((res) => {
      r = res;
    });
    return r;
  };
}
