import ngModuleName from './message.module';

'use strict';

const ngDirectiveName = 'tsngMessageSection';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'E',
  scope: {},
  bindToController: {
    title: '@',
    theme: '@',
    messages: '='
  },
  templateUrl: 'components/message/message-section.directive.html'
})
export default class MessagesSectionDirective {
}
