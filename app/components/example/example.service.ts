import ngModuleName from './example.module';

'use strict';

const ngServiceName = 'example';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log')
export default class ExampleService {
  public nowTime: Date;
  public nextYear: number;

  constructor(private log: angular.ILogService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public get message(): string {
    return this.nowTime.getFullYear() === this.nextYear ? 'Happy new Year!' : 'Keep on counting down...!';
  }

  public dumpDate(d: Date, flush: boolean = true): string {
    let info = [
      'Local Date:  ' + d.toLocaleDateString(),
      'Local Hours: ' + d.getHours(),
      'UTC Date:    ' + d.toISOString(),
      'UTC Hours:   ' + d.getUTCHours()
    ];
    if (flush) info.map(x => this.log.debug(x));
    return info.join('\n');
  }

  public addHours = (d: Date, h: number) => d.setTime(d.getTime() + (h * 60 * 60 * 1000));
}
