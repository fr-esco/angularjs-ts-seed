import Material from '../material/material';
import Markdown from '../markdown/markdown';

'use strict';

const ngModuleName = 'app.components.showcase';

export default angular.module(ngModuleName, ['ngComponentRouter', Material, 'ui.codemirror', Markdown])
  .config(['showcaseProvider', showcaseProvider => showcaseProvider.delay(1000)])
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
