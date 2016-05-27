let config = ($mdThemingProvider: angular.material.IThemingProvider,
  $mdIconProvider: angular.material.IIconProvider) => {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('grey', {
      'default': '600'
    })
    .accentPalette('teal', {
      'default': '500'
    })
    .warnPalette('defaultPrimary');

  $mdThemingProvider.theme('dark', 'default')
    .primaryPalette('defaultPrimary')
    .dark();

  $mdThemingProvider.theme('grey', 'default')
    .primaryPalette('grey');

  $mdThemingProvider.theme('custom', 'default')
    .primaryPalette('defaultPrimary', {
      'hue-1': '50'
    });

  $mdThemingProvider.definePalette('defaultPrimary', {
    '50': '#FFFFFF',
    '100': 'rgb(255, 198, 197)',
    '200': '#E75753',
    '300': '#E75753',
    '400': '#E75753',
    '500': '#E75753',
    '600': '#E75753',
    '700': '#E75753',
    '800': '#E75753',
    '900': '#E75753',
    'A100': '#E75753',
    'A200': '#E75753',
    'A400': '#E75753',
    'A700': '#E75753'
  });

  //  To apply a color from this palette to an element different than 
  //  'md-button, md-checkbox, md-progress-circular, md-progress-linear, 
  //  md-radio-button, md-slider, md-switch, md-tabs, md-text-float, md-toolbar'
  //  elements use: 
  // 
  //  md-colors="{color: 'greyFormPalette-500'}" directive
  // 
  $mdThemingProvider.definePalette('grey-form-palette', {
    '50': '#E0E0E0',
    '100': '#E0E0E0',
    '200': '#FFFFFF',  // Select highlight
    '300': '#E0E0E0',
    '400': '#E0E0E0',
    '500': '#9E9E9E',
    '600': '#E0E0E0',
    '700': '#E0E0E0',
    '800': '#E0E0E0',
    '900': '#E0E0E0',  // Items in select list
    'A100': '#E0E0E0', // Background
    'A200': '#E0E0E0',
    'A400': '#E0E0E0',
    'A700': '#E0E0E0'
  });

  $mdThemingProvider.theme('grey-form')
    .backgroundPalette('grey-form-palette');

  $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
};

config.$inject = ['$mdThemingProvider', '$mdIconProvider'];

export default config;
