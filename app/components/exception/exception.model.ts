import ngModuleName from './exception.module';

'use strict';

export let isHttpException = (exception: Error): boolean =>
  Object.prototype.hasOwnProperty.call(exception, 'status')
  && Object.prototype.hasOwnProperty.call(exception, 'statusText')
  || exception instanceof ServerError;

export interface IServerException {
  code: string;
  level: number;
  message: string;
  parameters: any[];
  status: number;
  category: string;
  errorID: string;
}

export class ApplicationError extends Error {
  constructor(e?: Error);
  constructor(message?: string);
  constructor(param?: any) {
    let message: string, name = 'ApplicationError';
    if (angular.isUndefined(param) || param === null) {
      param = 'Generic Exception.';
    }
    if (angular.isString(param)) {
      message = param;
    } else if (param instanceof Error) {
      message = (<Error>param).message;
      name += '.' + (<Error>param).name;
    } else {
      debugger;
      throw new TypeError('Invalid Application Error constructor parameter.');
    }
    super(message);
    this.name = name;
  }
}

export class CodeError extends ApplicationError {
  constructor(e?: Error);
  constructor(message?: string);
  constructor(param?: any) {
    super(param);
    // this.name += '.CodeError';
  }
}

export class ServerError extends ApplicationError {
  constructor(e?: Error);
  constructor(e?: angular.IHttpPromiseCallbackArg<any>);
  constructor(message?: string);
  constructor(param?: any) {
    if (isHttpException(param)) {

    }
    super(param);
    // this.name += '.ServerError';
  }
}

export class ExceptionConstants {
  public static INFO = 0;
  public static WARN = 1;
  public static ERROR = 2;

  public static HTTP_ERRORS = {
    0: 'The server is unreachable.',
    404: 'The requested data or service could not be found.',
    500: 'Unknown errors occurred at the server.'
  };
}
