import ngModuleName from './exception.module';

'use strict';

let simpleHandlerDecorator = ($delegate: angular.IExceptionHandlerService, $injector: angular.auto.IInjectorService) => {
  return (exception: Error, cause?: string) => {
    let $log = $injector.get<angular.ILogService>('$log');
    $log.debug('Simple exception handler.');
    // Route to server here!
    $delegate(exception, cause);
  };
};

simpleHandlerDecorator.$inject = ['$delegate', '$injector'];

let config = ($provide: angular.auto.IProvideService) => {
  $provide.decorator('$exceptionHandler', simpleHandlerDecorator);
};

config.$inject = ['$provide'];

export default config;
