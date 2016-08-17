# Exception Handling

## Angular Built-in system

Any uncaught exception in Angular expressions is delegated to [`$exceptionHandler`](https://docs.angularjs.org/api/ng/service/$exceptionHandler) service.
The default implementation simply delegates to `$log.error`, which logs it into the browser console.

*In unit tests, if `angular-mocks.js` is loaded, this service is overridden by mock [`$exceptionHandler`](https://docs.angularjs.org/api/ngMock/service/$exceptionHandler) which aids in testing.*

## Platform strategy

UE Platform provides the `platformExceptionHandler`, a *decoration* of the built-in handler, which delegates
both "HTTP exceptions" to a `serverExceptionHandler` and "core exceptions" to a
`coreExceptionHandler`. After that, it adds any caught error to the `messageHandler` queue, then the default behaviour is triggered.

### DTS

```bash
 app
 |-- components
     |-- exception
         |-- core-exception-handler.provider.ts    # dummy implementation of coreExceptionHandler
         |-- exception.ts                          # angular components registration
         |-- exception.config.ts                   # decorators and HTTP interceptor
         |-- exception.model.ts                    # platform Error types definition
         |-- exception.module.ts                   # angular module configuration
         |-- message-handler.service.ts            # API for error/warn/info messages management
         |-- server-exception-handler.provider.ts  # dummy implementation of serverExceptionHandler
```

## Customization

In order to handle HTTP server unsuccessful responses, the `platformExceptionHandler` sends
a `Server Error` (see `exception.model.ts`) to an Angular service named `serverExceptionHandler`.
If you need to customize its *dummy* behaviour, you have to define an Angular **provider**,
as shown in `server-exception-handler.provider.ts`, in your `app` module **with the same name**.

Every other code/core exception is wrapped in a `Core Error` (see `exception.model.ts`)
and sent to an Angular service named `coreExceptionHandler`.
If you need to customize its *dummy* behaviour, you have to define an Angular **provider**,
as shown in `core-exception-handler.provider.ts`, in your `app` module **with the same name**.
