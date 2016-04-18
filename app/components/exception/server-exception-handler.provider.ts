import ngModuleName from './exception.module';

import {ServerError} from './exception.model';

'use strict';

// the provider will be available as 'serverExceptionHandlerProvider'
// the created service will be available as 'serverExceptionHandler'
const ngProviderName = 'serverExceptionHandler';

@at.provider(ngModuleName, ngProviderName)
export class ServerExceptionHandlerProvider implements angular.IServiceProvider {
  // $get must be declared as method, not as function property (eg. `$get = () => new Service();`)
  @at.injectMethod('$log')
  public $get(log: angular.ILogService): angular.IExceptionHandlerService {
    return (exception: ServerError, cause?: string) => {
      log.debug('[serverExceptionHandler]');
    };
  }
}
