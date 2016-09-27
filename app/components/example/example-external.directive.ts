import ngModuleName from './example.module'

'use strict'

const ngDirectiveName = 'exampleExternal'

@at.directive(ngModuleName, ngDirectiveName, {
  replace: true,
  restrict: 'E',
  templateUrl: 'components/example/example-external.directive.html'
})
export default class ExampleExternalDirective {
  public test = true

  constructor(private $log: angular.ILogService) {
    'ngInject'
    $log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '))
  }
}
