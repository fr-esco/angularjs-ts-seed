import ngModuleName from './row.module'

'use strict'

const ngComponentName = 'tsngRow'

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'components/table/row/row.component.html'
})
export default class RowComponent {
  public test = true

  constructor(private $log: angular.ILogService) {
    'ngInject'
    $log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '))
  }
}
