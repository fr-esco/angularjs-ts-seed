import ngModuleName from './dashboard.module';

'use strict';

const ngComponentName = 'tsngDashboard';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'components/dashboard/dashboard.component.html',
})
export default class DashboardComponent implements at.OnActivate {
  public title: string;

  public files = [
    [
      'components/dashboard/dashboard.component.html',
      'components/dashboard/dashboard.component.ts',
      'components/dashboard/dashboard.module.ts',
    ], [
      'components/dashboard/panel/panel-widget.directive.html',
      'components/dashboard/panel/panel-widget.directive.ts',
      'components/dashboard/panel/panel.module.ts',
      'components/dashboard/panel/widget/widget.module.ts',
    ], [
      'components/dashboard/panel/widget/visitor.controller.ts',
      'components/dashboard/panel/widget/visitor.model.ts',
      'components/dashboard/panel/widget/visitor.service.ts',
      'components/dashboard/panel/widget/visitor.tpl.html',
      'components/dashboard/panel/widget/warning.controller.ts',
      'components/dashboard/panel/widget/warning.tpl.html',
      'components/dashboard/panel/widget/memory.controller.ts',
      'components/dashboard/panel/widget/memory.tpl.html',
    ], [
      'components/dashboard/panel/widget/control-panel.controller.ts',
      'components/dashboard/panel/widget/control-panel.tpl.html',
      'components/dashboard/panel/widget/usage.controller.ts',
      'components/dashboard/panel/widget/usage.model.ts',
      'components/dashboard/panel/widget/usage.service.ts',
      'components/dashboard/panel/widget/usage.tpl.html',
      'components/dashboard/panel/widget/autocomplete.controller.ts',
      'components/dashboard/panel/widget/autocomplete.tpl.html',
    ], [
      'components/dashboard/panel/widget/performance.controller.ts',
      'components/dashboard/panel/widget/performance.model.ts',
      'components/dashboard/panel/widget/performance.service.ts',
      'components/dashboard/panel/widget/performance.tpl.html',
      'components/dashboard/panel/widget/todo.controller.ts',
      'components/dashboard/panel/widget/todo.model.ts',
      'components/dashboard/panel/widget/todo.service.ts',
      'components/dashboard/panel/widget/todo.tpl.html',
    ], [
      'components/locale/locale.config.ts',
      'components/locale/locale.component.ts',
      'components/locale/locale.provider.ts',
      'components/dashboard/dashboard.component.html',
      'components/dashboard/i18n/en.json',
      'components/dashboard/i18n/it.json'
    ]
  ];

  constructor(private $log: angular.ILogService,
    private $translatePartialLoader: any,
    private $translate: any,
    private $locale: angular.ILocaleService,
    private $scope,
    private version: string) {
    'ngInject';
    $log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
    $log.debug(['VERSION:', version].join(' '));
  }

  public $routerOnActivate(next: at.ComponentInstruction) {
    this.title = next.routeData.data['title'];
    this.$translatePartialLoader.addPart('dashboard');
  }
}
