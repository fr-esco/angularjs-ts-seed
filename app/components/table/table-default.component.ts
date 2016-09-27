import ngModuleName from './table.module'

'use strict'

const ngComponentName = 'tsngTableDefault'

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'components/table/table-default.component.html'
})
export default class TableDefaultComponent {
  public test = true

  constructor(private $log: angular.ILogService) {
    'ngInject'
    $log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '))
  }
}
