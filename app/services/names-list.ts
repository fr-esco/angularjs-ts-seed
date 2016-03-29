export module Service {

  'use strict';

  @at.service(NamesList.moduleName, NamesList.myName)
  export class NamesList {
    public static get moduleName() { return 'app.services'; }
    public static get myName() { return 'NamesList'; }

    private names: Array<string>;
    constructor() {
      this.names = ['Dijkstra', 'Knuth', 'Turing', 'Hopper'];
    }
    public get() {
      return this.names;
    }
    public add(value) {
      this.names.push(value);
    }
  }

}
