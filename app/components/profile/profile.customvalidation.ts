import ngModuleName from './profile.module';
'use strict';

const ngDirectiveName = 'dateInThePastValidation';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A',
  require: 'ngModel',
  link: function(scope, elm, attrs, ctrl) {

    ctrl['$validators'].validate = function(modelValue, viewValue) {
      var today = new Date();
      // today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      if (ctrl['$isEmpty'](modelValue) || modelValue > today) {
        return false;
      }
      return true;
    };
  }
})

@at.inject('$log')
export default class ExamplesCustomValidation {
  constructor(private log: angular.ILogService) {
    log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '));
  }
}
