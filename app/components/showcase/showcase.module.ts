import Markdown from '../markdown/markdown'
import Material from '../material/material'

'use strict'

const ngModuleName = 'app.components.showcase'

export default angular.module(ngModuleName, ['ngComponentRouter', Material, 'ui.codemirror', Markdown])
  .config(['showcaseProvider', (showcaseProvider: any) => showcaseProvider.delay(1000)])
  .run(['$log', ($log: angular.ILogService) => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name
