import ngModuleName from './exception.module';

import {CoreError} from './exception.model';

'use strict';

// the provider will be available as 'coreExceptionHandlerProvider'
// the created service will be available as 'coreExceptionHandler'
const ngProviderName = 'coreExceptionHandler';

@at.provider(ngModuleName, ngProviderName)
export class CoreExceptionHandlerProvider implements angular.IServiceProvider {
  // $get must be declared as method, not as function property (eg. `$get = () => new Service();`)
  @at.injectMethod('$log')
  public $get(log: angular.ILogService): angular.IExceptionHandlerService {
    return (exception: CoreError, cause?: string) => {
      log.debug('[coreExceptionHandler]');
    };
  }
}
