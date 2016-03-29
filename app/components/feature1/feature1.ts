import {Service} from '../../services/names-list';

export module Feature1 {

  'use strict';

  export const moduleName = 'app.components.feature1';

  export let ngModule = angular.module(moduleName, [Service.NamesList.moduleName]);

  @at.controller(moduleName, 'Feature1Controller')
  @at.inject(Service.NamesList.myName)
  export class Feature1Controller implements at.IController {

    private names: Array<string>;

    constructor(private list: Service.NamesList) {
      this.names = list.get();
    }

    public addName(newName: string) {
      this.list.add(newName);
    }

  }

  @at.component(moduleName, 'featureTest', {
    template: () => '<span>{{ $ctrl.test }}</span>'
  })
  @at.inject('$log')
  export class Feature1Component implements at.OnInit {

    // public static transclude = true;
    // public static templateUrl = "components/feature1/feature-test.html";

    public test = 'Feature1Component';

    public static template: angular.IComponentTemplateFn = () => {
      return '<span>{{ $ctrl.name }}</span>';
    };

    constructor(private log: angular.ILogService) {
      log.debug('Feature1 constructor');
    }

    public $onInit(): void {
      this.log.debug('Feature1 $onInit');
    }

  }

}
