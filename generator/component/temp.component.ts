import ngModuleName from './<%= modName %>.module';

'use strict';

const ngComponentName = '<%= fullName %>';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    myAttribute: '@',
    myOneWayBinding: '<'
  },
  templateUrl: 'components/<%= path %>/<%= name %>.component.html'
})
@at.inject('$log')
export default class <%= upCaseName %>Component {
  public test = true;

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }
}
