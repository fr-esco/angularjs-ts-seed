/// <reference path="../typings/custom.system.d.ts" />
/// <reference path="../typings/browser.d.ts" />

System.config({
  paths: { '*': '*.js?v=<%= VERSION %>' }
});

System.import('./app').then(System.import('./partials')).then(() => {
  angular.module('app').requires.push('tpl');

  angular.element(document)
    .ready(() => {
      angular.module('app').config(['hotkeysProvider', function (cfphotkeys) {
        cfphotkeys.template = '' +
        ' <div class="hotkeys-div fade" ng-class="{in: helpVisible}" style="display: none;">' +
          '<div class="cfp-hotkeys">' +
          '<fieldset><legend>{{ title }}</legend>' +
          '<div class="hotkeys-close" ng-click="toggleCheatSheet()">&#215;</div>' +
          '<table><tbody>' +
          '<tr ng-repeat="hotkey in hotkeys | filter:{ description: \'!$$undefined$$\' }">' +
          '<td class="cfp-hotkeys-keys">' +
          '<span ng-repeat="key in hotkey.format() track by $index" class="cfp-hotkeys-key">{{ key }}</span>' +
          '</td>' +
          '<td class="cfp-hotkeys-text">{{ hotkey.description }}</td>' +
          '</tr>' +
          '</tbody></table>' +
          '</fieldset></div></div>';
      }]);
      angular.bootstrap(document.body, ['app']);
    });
})
  .catch(console.error.bind(console));
