import Material from '../material/material';
<<<<<<< HEAD
=======
import BottomSheet from '../bottom-sheet/bottom-sheet';
>>>>>>> origin/develop

'use strict';

const ngModuleName = 'app.components.main';

<<<<<<< HEAD
export default angular.module(ngModuleName, ['ngComponentRouter', Material])
=======
export default angular.module(ngModuleName, ['ngComponentRouter', Material, BottomSheet])
>>>>>>> origin/develop
  .run(['$log', $log => $log.debug(['ngModule', ngModuleName, 'loaded'].join(' '))]).name;
