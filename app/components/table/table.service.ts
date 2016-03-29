import ngModuleName from './table.module';

'use strict';

interface IIssue {
  issue: string;
  progress: number;
  status: string;
  class: string;
}

const ngServiceName = 'tableService';

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q')
export default class TodoService {
  private tableData: Array<IIssue> = [
    {
      issue: 'Nested views',
      progress: 100,
      status: 'Done',
      class: 'md-accent'
    },
    {
      issue: 'Table component',
      progress: 40,
      status: 'Feedback',
      class: ''
    },
    {
      issue: 'Dashboard tiles',
      progress: 100,
      status: 'Done',
      class: 'md-accent'
    },
    {
      issue: 'Panel widget',
      progress: 84,
      status: 'In progress',
      class: 'orange'
    },
    {
      issue: 'Form',
      progress: 100,
      status: 'Done',
      class: 'md-accent'
    },
    {
      issue: 'Custom CSS',
      progress: 20,
      status: 'Feedback',
      class: ''
    },
    {
      issue: 'Add backend',
      progress: 1,
      status: 'To do',
      class: 'md-warn'
    },
    {
      issue: 'Layout with sidebar',
      progress: 100,
      status: 'Done',
      class: 'md-accent'
    }
  ];

  constructor(private log: angular.ILogService, private q: angular.IQService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public loadAllItems() {
    return this.q.when(this.tableData);
  }

}
