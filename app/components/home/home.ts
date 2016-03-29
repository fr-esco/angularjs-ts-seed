
export module Home {

  'use strict';

  export const moduleName = 'app.components.home';

  export let ngModule = angular.module(moduleName, ['ngNewRouter']);

  @at.controller(moduleName, 'HomeController')
  @at.inject('$log', '$router')
  export class HomeController implements at.IController {

    constructor(private log: angular.ILogService, private router: any) {
      log.debug('childRouter', router);
    }

  }

}
