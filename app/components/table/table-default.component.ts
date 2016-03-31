import ngModuleName from './table.module';

'use strict';

const ngComponentName = 'tsfnTableDefault';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'table/table-default.component.html'
})
@at.inject('$log')
export default class TableDefaultComponent {
  public test = true;

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }
}
