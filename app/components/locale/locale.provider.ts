import ngModuleName from './locale.module';

import {ILocale} from './locale.model';

'use strict';

// the provider will be available as 'localeProvider'
// the created service will be available as 'locale'
const ngProviderName = 'locale';

interface ILocaleProvider extends angular.IServiceProvider {
  makeNoise(value: boolean): void;
}

@at.provider(ngModuleName, ngProviderName)
export class LocaleProvider implements ILocaleProvider {
  private notify = true;

  constructor() {
    this.notify = true;
  }

  public makeNoise(value: boolean): void {
    this.notify = value;
  }

  // $get must be declared as method, not as function property (eg. `$get = () => new Service();`)
  @at.injectMethod('$log', '$q', '$timeout', 'tmhDynamicLocale')
  public $get(log: angular.ILogService,
    q: angular.IQService,
    timeout: angular.ITimeoutService,
    tmhDynamicLocale: angular.dynamicLocale.tmhDynamicLocaleService) {
    return new LocaleProviderService(log, q, timeout, tmhDynamicLocale, this.notify);
  }
}

export default class LocaleProviderService {
  constructor(private log: angular.ILogService,
    private q: angular.IQService,
    private timeout: angular.ITimeoutService,
    private tmhDynamicLocale: angular.dynamicLocale.tmhDynamicLocaleService,
    private notify: boolean) {
    let s = ['ngProvider', ngProviderName, 'has loaded an', 'LocaleProviderService'].join(' ');
    if (notify)
      log.info(s);
    else
      log.debug(s);
  }

  public load(): angular.IPromise<ILocale[]> {
    let deferred = this.q.defer();
    this.timeout(() => deferred.resolve([{value: 'en', text: 'EN'}, {value: 'it', text: 'IT'}]), Math.random() * 1000);
    return deferred.promise;
  }

  public set(locale: string): void {
    return this.tmhDynamicLocale.set(locale);
  }
}
