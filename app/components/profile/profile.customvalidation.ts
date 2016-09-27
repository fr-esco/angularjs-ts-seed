import ngModuleName from './profile.module'
'use strict'

const ngDirectiveName = 'dateInThePastValidation'

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A',
  require: 'ngModel',
  link: (scope, elm, attrs, ctrl) => {

    ctrl['$validators'].validate = (modelValue, viewValue) => {
      const today = new Date()

      if (ctrl['$isEmpty'](modelValue) || modelValue > today) {
        return false
      }

      return true
    }
  }
})
export default class ExamplesCustomValidation {
  constructor(private $log: angular.ILogService) {
    'ngInject'
    $log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '))
  }
}
