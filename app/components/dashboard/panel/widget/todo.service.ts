import {ITodo} from './todo.model'
import ngModuleName from './widget.module'

'use strict'

const ngServiceName = 'todoService'

@at.service(ngModuleName, ngServiceName)
export default class TodoService {
  private todos: Array<ITodo> = [
    { text: 'Continuous integration', done: false },
    { text: 'Implement panel-widget directive', done: true },
    { text: 'Add backend', done: false }
  ]

  constructor(private $log: angular.ILogService, private $q: angular.IQService) {
    'ngInject'
    $log.debug(['ngService', ngServiceName, 'loaded'].join(' '))
  }

  public loadAllItems() {
    return this.$q.when(this.todos)
  }

}
