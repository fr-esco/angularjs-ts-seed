import ngModuleName from './exception.module';

'use strict';

export let isHttpException = (exception: Error): boolean =>
  Object.prototype.hasOwnProperty.call(exception, 'status')
  && Object.prototype.hasOwnProperty.call(exception, 'statusText');

let stringifyRequestConfig = (config: angular.IRequestConfig): string => {
  return [
    [config.method, config.url].join(' '),
    ['Params:', JSON.stringify(config.params)].join(' '),
    ['Data:', JSON.stringify(config.data)].join(' '),
    ['Headers:', JSON.stringify(config.headers)].join(' ')
  ].join('\n\t');
};

export interface IServerException {
  code: string;
  level: number;
  message: string;
  parameters?: any[];
  status: number;
  category: string;
  errorID: string;
}

export class ApplicationError extends Error {
  constructor(e?: Error);
  constructor(message?: string);
  constructor(param?: any) {
    let message: string, name = 'ApplicationError', stack;
    if (angular.isUndefined(param) || param === null) {
      param = 'Generic Exception.';
    }
    if (angular.isString(param)) {
      message = param;
    } else {
      message = (<Error>param).message;
      name += '.' + (<Error>param).name;
      stack = (<Error>param).stack;
    }
    super(message);
    this.name = name;
    this.message = message;
    this.stack = stack;
  }
}

export class CodeError extends ApplicationError {
  constructor(e?: Error);
  constructor(message?: string);
  constructor(param?: any) {
    if (angular.isUndefined(param) || param === null) {
      param = 'Generic Exception.';
    }
    let name = 'CodeError';
    if (!angular.isString(param)) {
      param.name = name + '.' + (<Error>param).name;
    }
    super(param);
  }
}

export class ServerError extends ApplicationError {
  public server: IServerException;

  constructor(e?: Error);
  constructor(e?: angular.IHttpPromiseCallbackArg<any>);
  constructor(message?: string);
  constructor(param?: any) {
    let server: IServerException,
      stack: string;
    if (isHttpException(param)) {
      if (param.data)
        server = {
          code: param.data.code,
          level: param.data.level,
          message: param.data.message,
          status: param.data.status,
          category: param.data.category,
          errorID: param.data.errorID
        };
      param.name = 'ServerError';
      param.message = 'ServerError: ' + (param.statusText || 'The server is unreachable.');
      if (param.config && !param.stack) {
        param.stack = stringifyRequestConfig(param.config);
      }
    }
    super(param);
    this.server = server;
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
