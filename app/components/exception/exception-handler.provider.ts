import ngModuleName from './exception.module'

'use strict'

// the provider will be available as 'exceptionHandlerProvider'
// the created service will be available as 'exceptionHandler'
const ngProviderName = 'exceptionHandler'

// Wrap a single function [func] in another function that handles both synchronous and asynchonous errors.
function decorate($injector: angular.auto.IInjectorService, obj: any, func: Function) {
  return angular.extend(function() {
    let handler = $injector.get<ExceptionHandlerProviderService>('exceptionHandler')
    return handler.call(func, obj, arguments)
  }, func)
}

interface IExceptionHandlerProvider extends angular.IServiceProvider {
  decorate($provide: angular.auto.IProvideService, services: string[]): void
}

@at.provider(ngModuleName, ngProviderName)
export class ExceptionHandlerProvider implements IExceptionHandlerProvider {

  // Decorate the mentioned [services] with automatic error handling.
  public decorate($provide: angular.auto.IProvideService, services: string[]) {
    angular.forEach(services, service => {
      $provide.decorator(service, this.decorator)
    })
  }

  // $get must be declared as method, not as function property (eg. `$get = () => new Service()`)
  @at.injectMethod('$log', 'exceptionConstants')
  public $get(log: angular.ILogService, exceptionConstants) {
    return new ExceptionHandlerProviderService(log, exceptionConstants.HTTP_ERRORS)
  }

  // Decorate all functions of the service [$delegate] with error handling.
  // This function should be used as decorator function in a call to $provide.decorator().
  @at.injectMethod('$delegate', '$injector')
  private decorator($delegate: any, $injector: angular.auto.IInjectorService) {
    // Loop over all functions in $delegate and wrap these functions using the [decorate] functions above.
    for (let prop in $delegate) {
      if (angular.isFunction($delegate[prop])) {
        $delegate[prop] = decorate($injector, $delegate, $delegate[prop])
      }
    }
    return $delegate
  }
}

export default class ExceptionHandlerProviderService {
  // The list of errors.
  private errors: string[]

  constructor(private log: angular.ILogService, private httpErrors: { [key: number]: string }) {
    log.debug(['ngProvider', ngProviderName, 'has loaded an', 'ExceptionHandlerProviderService'].join(' '))
    this.errors = []
  }

  // Report the error [err] in relation to the function [func].
  public funcError(func, err) {

    // This is a very limited error handler... you would probably want to check for user-friendly error messages
    // that were returned by the server, etc, etc, etc. Our original code contains a lot of checks and handling
    // of error messages to create the "perfect" error message for our users, you should probably do the same. :)

    if (err && !angular.isUndefined(err.status)) {
      // A lot of errors occur in relation to HTTP calls... translate these into user-friendly msgs.
      err = this.httpErrors[err.status]
    } else if (err && err.message) {
      // Exceptions are unwrapped.
      err = err.message
    }
    if (!angular.isString(err)) {
      err = 'An unknown error occurred.'
    }

    // Use the context provided by the service.
    if (func && func.description) {
      err = 'Unable to ' + func.description + '. ' + err
    }

    this.log.info('Caught error: ' + err)
    this.errors.push(err)
  }

  // Call the provided function [func] with the provided [args] and error handling enabled.
  public call(func, self, args) {
    this.log.debug('Function called: ', (func.name || func))

    var result
    try {
      result = func.apply(self, args)
    } catch (err) {
      // Catch synchronous errors.
      this.funcError(func, err)
      throw err
    }

    // Catch asynchronous errors.
    var promise = result && result.$promise || result
    if (promise && angular.isFunction(promise.then) && angular.isFunction(promise['catch'])) {
      // promise is a genuine promise, so we call [handler.async].
      this.async(func, promise)
    }

    return result
  }

  // Automatically record rejections of the provided [promise].
  public async(func, promise) {
    promise['catch'](err => {
      this.funcError(func, err)
    })
    return promise
  }
}
