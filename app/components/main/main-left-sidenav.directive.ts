import MainController from './main.component'
import ngModuleName from './main.module'

'use strict'

const ngDirectiveName = 'tsngMainLeftSidenav'

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'E',
  replace: true,
  templateUrl: 'components/main/main-left-sidenav.directive.html'
})
export default class MainLeftSidenavDirective extends MainController {
}
