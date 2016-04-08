import ngModuleName from './showcase.module';

'use strict';

// the provider will be available as 'showcaseProvider'
// the created service will be available as 'showcase'
const ngProviderName = 'showcase';

interface IShowcaseProvider extends angular.IServiceProvider {
  delay(delay: number): void;
}

@at.provider(ngModuleName, ngProviderName)
export class ShowcaseProvider implements IShowcaseProvider {
  private $delay: number;

  constructor() {
    this.$delay = 100;
  }

  public delay(delay: number): void {
    this.$delay = delay;
  }

  // $get must be declared as method, not as function property (eg. `$get = () => new Service();`)
  @at.injectMethod('$log', '$http', '$q', '$timeout')
  public $get(log: angular.ILogService, http: angular.IHttpService, q: angular.IQService, timeout: angular.ITimeoutService) {
    return new ShowcaseProviderService(log, http, q, timeout, this.$delay);
  }
}

export default class ShowcaseProviderService {
  constructor(private log: angular.ILogService,
    private http: angular.IHttpService,
    private q: angular.IQService,
    private timeout: angular.ITimeoutService,
    private delay: number) {
    let s = ['ngProvider', ngProviderName, 'has loaded an', 'ShowcaseProviderService'].join(' ');
    log.debug(s);
  }

  public load(files: string[]) {
    let promises: { [id: string]: angular.IPromise<string> } = {};
    files.forEach(file => (promises[file] = this.loadFile(file)));
    return this.q.all(promises);
  }

  private loadFile(file: string) {
    if (this.delay > 0) {
      this.log.debug('Delayed loading');
      let deferred = this.q.defer();
      this.timeout(() => deferred.resolve(this.loadFileInternal(file)),
        Math.random() * this.delay);
      return deferred.promise;
    } else {
      return this.loadFileInternal(file);
    }
  }

  private loadFileInternal(file: string) {
    return this.http.get<string>(file)
      .then(response => {
        if (typeof response.data === 'object') {
          return JSON.stringify(response.data, null, 2);
        } else {
          return response.data;
        }
      });
  }
}
