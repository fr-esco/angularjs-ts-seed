import ngModuleName from './exception.module';

'use strict';

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
}

@at.constantObj(ngModuleName, 'exceptionConstants')
export class ExceptionConstants {
  public static get INFO() { return 0; }
  public static get WARN() { return 1; }
  public static get ERROR() { return 2; }

  public static get HTTP_ERRORS() {
    return {
      0: 'The server is unreachable.',
      404: 'The requested data or service could not be found.',
      500: 'Unknown errors occurred at the server.'
    };
  }
}
