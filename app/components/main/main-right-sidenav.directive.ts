import MainController from './main.component'
import ngModuleName from './main.module'

'use strict'

const ngDirectiveName = 'tsngMainRightSidenav'

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'E',
  replace: true,
  templateUrl: 'components/main/main-right-sidenav.directive.html'
})
export default class MainRightSidenavDirective extends MainController {
}
