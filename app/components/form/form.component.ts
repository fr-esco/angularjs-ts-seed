import ngModuleName from './form.module';

'use strict';

const ngComponentName = 'tsfnForm';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    myAttribute: '@',
    myOneWayBinding: '<'
  },
  templateUrl: 'form/form.component.html'
})
@at.inject('$log')
export default class FormsComponent {
  public test = true;

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }
}
