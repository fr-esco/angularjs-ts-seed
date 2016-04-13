import ngModuleName from './exception.module';

'use strict';

class ExceptionModuleConfiguration {
  @at.injectMethod('$provide')
  public static config($provide: angular.auto.IProvideService) {
    $provide.decorator('$exceptionHandler', ExceptionModuleConfiguration.simpleHandlerDecorator);
  }

  @at.injectMethod('$delegate', '$injector')
  private static simpleHandlerDecorator($delegate: angular.IExceptionHandlerService, $injector: angular.auto.IInjectorService) {
    return (exception: Error, cause?: string) => {
      let $log = $injector.get<angular.ILogService>('$log');
      $log.debug('Simple exception handler.');
      // Route to server here!
      $delegate(exception, cause);
    };
  }
}

export default ExceptionModuleConfiguration.config;
