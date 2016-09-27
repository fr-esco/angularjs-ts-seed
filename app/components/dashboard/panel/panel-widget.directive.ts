import ngModuleName from './panel.module'

'use strict'

const ngDirectiveName = 'tsngPanelWidget'

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'E',
  replace: true,
  // transclude: true,
  scope: {},
  bindToController: {
    title: '@',
    template: '@',
    options: '@'
  },
  templateUrl: 'components/dashboard/panel/panel-widget.directive.html'
  // compile: (element, attrs, linker) => (scope, element) => {
  //   linker(scope, clone => {
  //     element.append(clone)
  //   })
  // }
})
export default class PanelWidgetDirective {
}
