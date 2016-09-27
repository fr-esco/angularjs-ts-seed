import BottomSheet from '../bottom-sheet/bottom-sheet'
import Material from '../material/material'

'use strict'

const ngModuleName = 'app.components.main'

export default angular.module(ngModuleName, ['ngComponentRouter', Material, BottomSheet])
  .run(['$log', ($log: angular.ILogService) => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name
