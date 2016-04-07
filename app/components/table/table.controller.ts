import ngModuleName from './table.module';

import TableService from './table.service';

'use strict';

const ngControllerName = 'TableController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('tableService', '$log')
export default class TableController {

  public tableData = [];

  constructor(private tableService: TableService,
    private log: angular.ILogService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));

    tableService.loadAllItems()
      .then(data => this.tableData = [].concat(data));
  }
}
