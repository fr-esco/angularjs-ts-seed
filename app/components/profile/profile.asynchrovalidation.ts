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
      var usernames = ['JohnJohn_88', 'Peter_77', 'usernameEx'];
      ctrl['$asyncValidators'].asynchroValidator = (modelValue, viewValue) => {

        if (ctrl['$isEmpty'](modelValue)) {
          // consider empty model valid
          return scope['vm'].q.when();
        }

        var def = scope['vm'].q.defer();
        scope['vm'].timeout(() => {
          // Mock a delayed response
          if (usernames.indexOf(modelValue) === -1) {
            def.resolve();
          } else
            def.reject();
        }, 2000);

        return def.promise;
      };
    });
  }
})

@at.inject('$q', '$timeout')
export default class Asynchrovalidation {
  constructor(protected q: angular.IQService, protected timeout: angular.ITimeoutService) {
  }
}
