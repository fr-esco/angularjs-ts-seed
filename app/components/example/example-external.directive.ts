import ngModuleName from './example.module';

'use strict';

const ngDirectiveName = 'exampleExternal';

@at.directive(ngModuleName, ngDirectiveName, {
  replace: true,
  restrict: 'E',
  templateUrl: 'example/example-external.directive.html'
})
@at.inject('$log')
export default class ExampleExternalDirective {
  public test = true;

  constructor(private log: angular.ILogService) {
    log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '));
  }
}
