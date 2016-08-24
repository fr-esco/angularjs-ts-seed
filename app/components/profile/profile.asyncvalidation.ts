import ngModuleName from './profile.module';
import AddclientComponent from './profile.component';

'use strict';

const ngDirectiveName = 'usernameAsyncValidator';

//  We mock the server request with a $q deferred
@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A',
  require: 'ngModel',
  scope: {},
  link: (scope, elm, attrs, ctrl) => {
    const $q = scope['vm'].$q;
    const $timeout = scope['vm'].$timeout;
    const usernames = ['JohnJohn_88', 'Peter_77', 'usernameEx'];

    ctrl['$asyncValidators'].usernameAvailable = (modelValue, viewValue) => {
      return $q((resolve, reject) => {
        if (ctrl['$isEmpty'](modelValue)) {
          resolve();
        } else {
          $timeout(() => {
            // Mock a delayed response
            if (usernames.indexOf(modelValue) === -1)
              resolve();
            else
              reject();
          }, 1000);
        }
      });
    };
  }
})
export default class Asyncvalidator {
  constructor(protected $q: angular.IQService, protected $timeout: angular.ITimeoutService) {
    'ngInject';
  }
}
