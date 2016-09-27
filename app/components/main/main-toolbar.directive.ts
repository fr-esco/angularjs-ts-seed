import MainController from './main.component'
import ngModuleName from './main.module'

'use strict'

const ngDirectiveName = 'tsngMainToolbar'

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'E',
  replace: true,
  templateUrl: 'components/main/main-toolbar.directive.html'
})
export default class MainToolbarDirective extends MainController {
}
