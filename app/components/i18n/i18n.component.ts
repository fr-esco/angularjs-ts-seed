import ngModuleName from './i18n.module';

'use strict';

const ngComponentName = 'tsfnI18n';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    myAttribute: '@',
    gender: '@',
    clock: '<',
    numOfguests: '@'
  },
  templateUrl: 'i18n/i18n.component.html'
})
@at.inject('$log', '$interval', '$locale')
export default class I18nComponent implements angular.OnActivate, at.OnInit, at.OnDestroy {
  public title: string;
  public clock: number;
  public gender = 'male';
  public name = 'John';
  public numOfguests = 1;
  public files = [
    [
      'components/i18n/i18n.component.html',
      'components/i18n/i18n.component.ts',
      'components/i18n/i18n/en.json',
      'components/i18n/i18n/it.json'
    ]
  ];
  private tickInterval = 1000; // ms
  private intervalPromise: angular.IPromise<number>;

  constructor(private log: angular.ILogService, private $interval: angular.IIntervalService, public $locale: angular.ILocaleService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $routerOnActivate(next: at.ComponentInstruction) {
    this.title = next.routeData.data['title'];
  }

  public $onInit() {
    this.intervalPromise = this.$interval(() => this.clock = Date.now(), this.tickInterval);
  }

  public $onDestroy(){
    this.$interval.cancel(this.intervalPromise);
  }
}
