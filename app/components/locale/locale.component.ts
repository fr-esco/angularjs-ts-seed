import ngModuleName from './locale.module';

import LocaleService from './locale.provider';
import {ILocale} from './locale.model';

'use strict';

const ngComponentName = 'tsfnLocale';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    locale: '@'
  },
  templateUrl: 'locale/locale.component.html'
})
@at.inject('locale', '$filter', '$log', '$q', '$timeout', '$translate', '$rootScope')
export default class LocaleComponent implements at.OnInit {
  public locale: string;
  public locales: ILocale[];

  constructor(private localeService: LocaleService,
    private filter: angular.IFilterService,
    private log: angular.ILogService,
    private q: angular.IQService,
    private timeout: angular.ITimeoutService,
    private $translate: angular.translate.ITranslateService,
    private $rootScope: angular.IRootScopeService) {
      
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  
  }

  public $onInit() {
    this.localeService.load().then(data => {
      this.locales = data;
      this.locale = data[0].value;
      this.localeService.set(this.locale);
      // On locale change, apply translation
      this.$rootScope.$on('$localeChangeSuccess', (event: angular.IAngularEvent, locale: string, $locale: angular.ILocaleService) => {
        event.currentScope['$translate'].use(locale);
        event.currentScope['amMoment'].changeLocale(locale);
      });
    });
  }

  public changeLocale() {
    this.localeService.set(this.locale);
  }
}
