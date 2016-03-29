import ngModuleName from './<%= modName %>.module';

'use strict';

const ngDirectiveName = '<%= fullName %>';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A', // default: EA
  templateUrl: '<%= path %>/<%= name %>.directive.html'
})
@at.inject('$log')
export default class <%= upCaseName %>Directive {
  public test = true;

  constructor(private log: angular.ILogService) {
    log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '));
  }
}
