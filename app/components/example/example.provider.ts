import ngModuleName from './example.module';

'use strict';

// the provider will be available as 'sampleProvider'
// the created service will be available as 'sample'
const ngProviderName = 'sample';

interface IExampleProvider extends angular.IServiceProvider {
  makeNoise(value: boolean): void;
}

@at.provider(ngModuleName, ngProviderName)
export class ExampleProvider implements IExampleProvider {
  private notify = true;

  constructor() {
    this.notify = true;
  }

  public makeNoise(value: boolean): void {
    this.notify = value;
  }

  // $get must be declared as method, not as function property (eg. `$get = () => new Service();`)
  @at.injectMethod('$log')
  public $get(log: angular.ILogService) {
    return new ExampleProviderService(log, this.notify);
  }
}

export default class ExampleProviderService {
  constructor(private log: angular.ILogService, private notify: boolean) {
    let s = ['ngProvider', ngProviderName, 'has loaded an', 'ExampleProviderService'].join(' ');
    if (notify)
      log.info(s);
    else
      log.debug(s);
  }
}
