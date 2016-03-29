import ngModuleName from './main.module';
import MainController from './main.component';

'use strict';

const ngDirectiveName = 'tsfnMainRightSidenav';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'E',
  replace: true,
  templateUrl: 'main/main-right-sidenav.directive.html'
})
export default class MainRightSidenavDirective extends MainController {
}
