import ngModuleName from './main.module';
import MainController from './main.component';

'use strict';

const ngDirectiveName = 'tsngMainToolbar';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'E',
  replace: true,
  templateUrl: 'components/main/main-toolbar.directive.html'
})
export default class MainToolbarDirective extends MainController {
}
