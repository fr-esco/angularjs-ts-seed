'use strict';

let config = (tmhDynamicLocaleProvider, $translateProvider, $translatePartialLoaderProvider) => {
  $translateProvider.useStaticFilesLoader({
    files: [{
      prefix: '/i18n/locale-',
      suffix: '.json'
    }]
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

  tmhDynamicLocaleProvider.localeLocationPattern('/lib/angular-locale_{{locale}}.js');
};

config.$inject = ['tmhDynamicLocaleProvider', '$translateProvider', '$translatePartialLoaderProvider'];

export default config;
