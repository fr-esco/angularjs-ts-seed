import ngModuleName from './timezone.module';
import TimezoneService from './timezone.provider';

'use strict';

const ngComponentName = 'tsngTimezone';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    timezone: '@',
    timezones: '<'
  },
  templateUrl: 'timezone/timezone.component.html'
})
@at.inject('timezone', 'moment', '$log')
export default class TimezoneComponent implements at.OnInit {
  public timezone;
  public timezones = [];

  constructor(private timezoneService: TimezoneService, private moment: moment.MomentStatic, private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $onInit() {
    this.timezoneService.getTimezones().then(data => {
      this.timezones = data;
      this.timezone = this.moment.tz.guess();
    });
  }

  public changeTimezone() {
    this.timezoneService.set(this.timezone);
  }
}
