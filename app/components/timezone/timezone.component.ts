import ngModuleName from './timezone.module';
import TimezoneService from './timezone.provider';

'use strict';

const ngComponentName = 'tsfnTimezone';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    timezone: '@',
    timezones: '<'
  },
  templateUrl: 'timezone/timezone.component.html'
})
@at.inject('timezone', '$log', 'amMoment')
export default class TimezoneComponent implements at.OnInit {
  public timezone: string;
  public timezones = [];

  constructor(private timezoneService: TimezoneService, private log: angular.ILogService, amMoment: any) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $onInit() {
    this.timezoneService.getTimezones().then(data => {
      this.timezones = data;
      this.timezone = data[0];
    });
  }

  public changeTimezone() {
    this.timezoneService.set(this.timezone);
  }
}
