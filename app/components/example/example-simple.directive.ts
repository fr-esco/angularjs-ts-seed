import ngModuleName from './example.module'

'use strict'

const ngDirectiveName = 'exampleSimple'

@at.directive(ngModuleName, ngDirectiveName, {
  replace: true,
  restrict: 'E',
  template: '<h1>Title written, less than {{1 + 1}} times</h1>'
})
export default class ExampleSimpleDirective {
  constructor(private $log: angular.ILogService) {
    'ngInject'
    $log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '))
  }
}
