import ngModuleName from './example.module';

'use strict';

const ngDirectiveName = 'exampleSimple';

@at.directive(ngModuleName, ngDirectiveName, {
  replace: true,
  restrict: 'E',
  template: '<h1>Title written, less than {{1 + 1}} times</h1>'
})
@at.inject('$log')
export default class ExampleSimpleDirective {
  constructor(private log: angular.ILogService) {
    log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '));
  }
}
