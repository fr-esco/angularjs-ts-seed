import ngModuleName from './showcase.module';

'use strict';

// the provider will be available as 'showcaseProvider'
// the created service will be available as 'showcase'
const ngProviderName = 'showcase';

interface IShowcaseProvider extends angular.IServiceProvider {
  makeNoise(value: boolean): void;
}

@at.provider(ngModuleName, ngProviderName)
export class ShowcaseProvider implements IShowcaseProvider {
  private notify = true;

  constructor() {
    this.notify = true;
  }

  public makeNoise(value: boolean): void {
    this.notify = value;
  }

  // $get must be declared as method, not as function property (eg. `$get = () => new Service();`)
  @at.injectMethod('$log', '$http', '$q', '$timeout')
  public $get(log: angular.ILogService, http: angular.IHttpService, q: angular.IQService, timeout: angular.ITimeoutService) {
    return new ShowcaseProviderService(log, http, q, timeout, this.notify);
  }
}

export default class ShowcaseProviderService {
  constructor(private log: angular.ILogService,
    private http: angular.IHttpService,
    private q: angular.IQService,
    private timeout: angular.ITimeoutService,
    private notify: boolean) {
    let s = ['ngProvider', ngProviderName, 'has loaded an', 'ShowcaseProviderService'].join(' ');
    if (notify)
      log.info(s);
    else
      log.debug(s);
  }

  public load(files: string[]) {
    let promises: { [id: string]: angular.IPromise<string> } = {};
    files.forEach(file => (promises[file] = this.loadFile(file)));
    return this.q.all(promises);
  }

  private loadFile(file: string) {
    let deferred = this.q.defer();
    this.timeout(() => deferred.resolve(this.http.get<string>(file)
      .then(response => response.data)), Math.random() * 1000);
    return deferred.promise;
  }
}
