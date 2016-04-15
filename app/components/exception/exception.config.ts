import ngModuleName from './exception.module';

import {CodeError} from './exception.model';
import MessageHandlerService from './message-handler.service';

'use strict';

function ensureCodeError(e: Error) {
  if (!(e instanceof CodeError))
    e = new CodeError(e);
}

let isHttpException = (exception: Error): boolean =>
  Object.prototype.hasOwnProperty.call(exception, 'status') &&
  Object.prototype.hasOwnProperty.call(exception, 'statusText');

class ExceptionModuleConfiguration {
  @at.injectMethod('$provide', '$httpProvider')
  public static config($provide: angular.auto.IProvideService, $httpProvider: angular.IHttpProvider) {
    $provide.decorator('$exceptionHandler', ExceptionModuleConfiguration.simpleHandlerDecorator);
    $provide.decorator('$exceptionHandler', ExceptionModuleConfiguration.frontHandlerDecorator);
    // $httpProvider.interceptors.push(ExceptionModuleConfiguration.httpInterceptor);
  }

  @at.injectMethod('$delegate', '$injector')
  private static simpleHandlerDecorator($delegate: angular.IExceptionHandlerService, $injector: angular.auto.IInjectorService) {
    return (exception: Error, cause?: string) => {
      let $log = $injector.get<angular.ILogService>('$log');
      $log.info('Simple exception handler.');

      // ensureCodeError(exception);

      let messageHandler = $injector.get<MessageHandlerService>('messageHandler');
      messageHandler.addError(exception);

      // Route to server here!

      $delegate(exception, cause);
    };
  }

  @at.injectMethod('$delegate', '$injector')
  private static frontHandlerDecorator($delegate: angular.IExceptionHandlerService, $injector: angular.auto.IInjectorService) {
    return (exception: Error, cause?: string) => {
      let $log = $injector.get<angular.ILogService>('$log');
      // debugger;
      $log.debug(['[$exceptionHandler:frontHandlerDecorator]', exception.name].join(' '));
      if (isHttpException(exception)) {
        $log.debug(['[$exceptionHandler:frontHandlerDecorator]', 'HTTP Exception'].join(' '));
      } else {
        $log.debug(['[$exceptionHandler:frontHandlerDecorator]', 'Core Exception'].join(' '));
      }
      // $delegate(exception, cause);
    };
  }

  @at.injectMethod('$q', '$log', '$injector')
  private static httpInterceptor($q: angular.IQService, $log: angular.ILogService, $injector: angular.auto.IInjectorService): angular.IHttpInterceptor {
    let messageHandler = $injector.get<MessageHandlerService>('messageHandler');
    return {
      responseError: response => {
        // debugger;
        messageHandler.addError({ level: -1 });
        let status = parseInt(response.status);
        if (status < 0) {
          return $q.reject(false);
        }
        if (status >= 400 && status < 500) {

        } else if (status >= 500) {

        }
        return $q.reject(response);
      }
    };
  }
}

export default ExceptionModuleConfiguration.config;
