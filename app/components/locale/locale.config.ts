'use strict';

let config = (tmhDynamicLocaleProvider: angular.dynamicLocale.tmhDynamicLocaleProvider, $translateProvider: angular.translate.ITranslateProvider) => {
  'ngInject';
  $translateProvider
    .addInterpolation('$translateMessageFormatInterpolation')
    .useStaticFilesLoader({
      prefix: 'i18n/locale-',
      suffix: '.json'
    })
    .useSanitizeValueStrategy('sanitize')
    .registerAvailableLanguageKeys(['en', 'it'], {
      'en-*': 'en',
      'it-*': 'it'
    })
    .useMissingTranslationHandlerLog()
    .useLocalStorage()
    .fallbackLanguage('en')
    .preferredLanguage('en');

  tmhDynamicLocaleProvider.localeLocationPattern(['lib/angular-locale_{{locale}}', '.', 'js'].join(''));
};

export default config;
