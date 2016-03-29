import {Service} from '../../services/names-list';

import ngModuleName from './about.module';

'use strict';

@at.controller(ngModuleName, 'AboutController')
@at.inject('$log', '$router', Service.NamesList.myName)
export default class AboutController implements at.IController {
  private names: Array<string>;

  constructor(private log: angular.ILogService,
    private router: any,
    private list: Service.NamesList) {
    log.debug('router', router);
    this.names = list.get();
  }

  public addName(newName: string) {
    this.list.add(newName);
  }
}
