import ngModuleName from './widget.module';

import {ITodo} from './todo.model';
import TodoService from './todo.service';

'use strict';

const ngControllerName = 'TodoController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('todoService', '$log')
export default class TodoController {

  public todos: Array<ITodo> = [];
  public todoText: string;

  constructor(private todoService: TodoService,
    private log: angular.ILogService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));

    todoService.loadAllItems().then(todos => this.todos = [].concat(todos));
  }

  public addTodo() {
    if (this.todoText && this.todoText.length > 0)
      this.todos.push({ text: this.todoText, done: false });
    this.todoText = '';
  }

  public get remaining() {
    return this.todos.reduce((count, todo) => count += todo.done ? 0 : 1, 0);
  }

  public archive(event: Event) {
    // prevent from submitting
    event.preventDefault();
    this.todos = this.todos.filter(todo => !todo.done);
  }

  public toggleAll() {
    let done = this.remaining > 0;
    angular.forEach(this.todos, todo => todo.done = done);
  }

}
