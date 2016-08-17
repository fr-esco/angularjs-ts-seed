import ngModuleName from './timezone.module';

'use strict';

// the provider will be available as 'timezoneProvider'
// the created service will be available as 'timezone'
const ngProviderName = 'timezone';

interface ITimezoneProvider extends angular.IServiceProvider {
  makeNoise(value: boolean): void;
}

@at.provider(ngModuleName, ngProviderName)
export class TimezoneProvider implements ITimezoneProvider {
  private notify = true;

  constructor() {
    this.notify = true;
  }

  public makeNoise(value: boolean): void {
    this.notify = value;
  }

  // $get must be declared as method, not as function property (eg. `$get = () => new Service();`)
  @at.injectMethod('$log', 'moment', '$q', '$timeout')
  public $get(log: angular.ILogService, moment: moment.MomentStatic, q: angular.IQService, timeout: angular.ITimeoutService) {
    return new TimezoneProviderService(log, moment, q, timeout, this.notify);
  }
}

export default class TimezoneProviderService {
  constructor(private log: angular.ILogService,
    private moment: moment.MomentStatic,
    private q: angular.IQService,
    private timeout: angular.ITimeoutService,
    private notify: boolean) {

    let s = ['ngProvider', ngProviderName, 'has loaded an', 'TimezoneProviderService'].join(' ');
    if (notify)
      log.info(s);
    else
      log.debug(s);
  }

  public getTimezones(): angular.IPromise<string[]> {
    let deferred = this.q.defer();
    this.timeout(() => deferred.resolve(this.moment.tz.names()), Math.random() * 1000);
    return deferred.promise;
  }

  public set(timezone: string) {
    this.moment.tz.setDefault(timezone);
  }
}
