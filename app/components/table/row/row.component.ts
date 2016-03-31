import ngModuleName from './row.module';

'use strict';

const ngComponentName = 'tsfnRow';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'table/row/row.component.html'
})
@at.inject('$log')
export default class RowComponent {
  public test = true;

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }
}
