import ngModuleName from './table.module';

import TableService from './table.service';

'use strict';

const ngComponentName = 'tsfnTable';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'table/table.component.html',
})
@at.inject('tableService', '$log')
export default class TableComponent implements at.OnInit, at.OnActivate {
  public title: string;
  public tableData = [];

  public files = [
    'components/table/table.component.html',
    'components/table/table.component.ts',
    'components/table/table.service.ts',
    'components/table/table.module.ts'
  ];

  constructor(private tableService: TableService,
    private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $onInit() {
    this.tableService.loadAllItems()
      .then(data => this.tableData = [].concat(data));
  }

  public $routerOnActivate(next: at.ComponentInstruction) {
    this.title = next.routeData.data['title'];
  }
}
