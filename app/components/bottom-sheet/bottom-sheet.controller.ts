import ngModuleName from './bottom-sheet.module';

'use strict';

const ngControllerName = 'BottomSheetController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('$log', '$mdBottomSheet')
class BottomSheetController {
  public actions = [
    { name: 'Share', icon: 'share', url: 'https://www.google.com' },
    { name: 'Star', icon: 'star', url: 'https://www.google.com' }
  ];

  constructor(private log: angular.ILogService, private mdBottomSheet: angular.material.IBottomSheetService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));
  }

  public performAction(action) {
    this.mdBottomSheet.hide(action);
  }
}
