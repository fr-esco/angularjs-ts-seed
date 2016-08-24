import ngModuleName from './profile.module';
import AddclientComponent from './profile.component';

'use strict';

const ngDirectiveName = 'usernameAsynchroValidation';

//  We mock the server request with a $q deferred
@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A',
  require: 'ngModel',
  scope: {},
  link: (scope, elm, attrs, ctrl) => {
    elm.on('blur', () => {
      const usernames = ['JohnJohn_88', 'Peter_77', 'usernameEx'];

      if (ctrl['$isEmpty'](ctrl['$modelValue'])) {
        // consider empty model valid
        return scope['vm'].$q.when();
      }

      const def = scope['vm'].$q.defer();
      scope['vm'].$timeout(() => {
        // Mock a delayed response
        if (usernames.indexOf(ctrl['$modelValue']) === -1) {
          def.resolve(ctrl['$setValidity']('asynchroValidator', true));
        } else
          def.reject(def.resolve(ctrl['$setValidity']('asynchroValidator', false)));
      }, 2000);

    });
  }
})

export default class Asynchrovalidation {
  constructor(protected $q: angular.IQService, protected $timeout: angular.ITimeoutService) {
    'ngInject';
  }
}
