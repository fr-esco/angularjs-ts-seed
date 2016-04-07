'use strict';

let config = (tmhDynamicLocaleProvider, $translateProvider, $translatePartialLoaderProvider) => {
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '/i18n/components/{part}/i18n/{lang}.json'
  })
    // .determinePreferredLanguage()
    // .determinePreferredLanguage(function () {
    // return document.documentElement.getAttribute('lang');
    // })
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
