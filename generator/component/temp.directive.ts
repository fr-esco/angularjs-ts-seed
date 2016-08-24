import ngModuleName from './<%= modName %>.module';

'use strict';

const ngDirectiveName = '<%= fullName %>';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A', // default: EA
  templateUrl: 'components/<%= path %>/<%= name %>.directive.html'
})
export default class <%= upCaseName %>Directive {
  public test = true;

  constructor(private $log: angular.ILogService) {
    'ngInject';
    $log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '));
  }
}
