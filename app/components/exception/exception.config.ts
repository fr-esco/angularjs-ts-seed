import ngModuleName from './exception.module';

import {CodeError, ServerError, isHttpException} from './exception.model';
import MessageHandlerService from './message-handler.service';

'use strict';

function ensureCodeError(e: Error) {
  if (!(e instanceof CodeError))
    return new CodeError(e);
  return e;
}
function ensureServerError(e: Error) {
  if (!(e instanceof ServerError))
    return new ServerError(e);
  return e;
}

class ExceptionModuleConfiguration {
  @at.injectMethod('$provide', '$httpProvider')
  public static config($provide: angular.auto.IProvideService, $httpProvider: angular.IHttpProvider) {
    $provide.decorator('$exceptionHandler', ExceptionModuleConfiguration.simpleHandlerDecorator);
    $provide.decorator('$exceptionHandler', ExceptionModuleConfiguration.frontHandlerDecorator);
    $httpProvider.interceptors.push(ExceptionModuleConfiguration.httpInterceptor);
  }

  @at.injectMethod('$delegate', '$injector')
  private static simpleHandlerDecorator($delegate: angular.IExceptionHandlerService, $injector: angular.auto.IInjectorService) {
    return (exception: Error, cause?: string) => {
      let $log = $injector.get<angular.ILogService>('$log');
      $log.debug('[$exceptionHandler:simpleHandlerDecorator]');

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
      $log.debug(['[$exceptionHandler:frontHandlerDecorator]', 'Caught', exception.name].join(' '));
      if (isHttpException(exception) || exception instanceof ServerError) {
        $log.debug(['[$exceptionHandler:frontHandlerDecorator]', 'HTTP Exception'].join(' '));
        exception = ensureServerError(exception);
      } else {
        $log.debug(['[$exceptionHandler:frontHandlerDecorator]', 'Core Exception'].join(' '));
        exception = ensureCodeError(exception);
      }
      $delegate(exception, cause);
    };
  }

  @at.injectMethod('$q', '$log', '$injector')
  private static httpInterceptor($q: angular.IQService, $log: angular.ILogService, $injector: angular.auto.IInjectorService): angular.IHttpInterceptor {
    let messageHandler = $injector.get<MessageHandlerService>('messageHandler');
    return {
      responseError: response => {
        // debugger;
        let status = parseInt(response.status);
        if (status < 0) {
          throw new ServerError(response);
        }
        if (status >= 400 && status < 500) {
          throw new ServerError(response);
        } else if (status >= 500) {
          throw new ServerError(response);
        }
        return $q.reject(response);
      }
    };
  }
}

export default ExceptionModuleConfiguration.config;
