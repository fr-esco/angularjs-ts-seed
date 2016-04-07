import ngModuleName from './main.module';
import {IMenuItem} from '../common/navigation-menu.model';
import NavigationService from '../common/navigation.service';

'use strict';

const ngControllerName = 'MainController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('navigationService', '$log', '$q', '$state', '$mdSidenav', '$mdBottomSheet', '$mdToast')
export default class MainController {

  public menuItems: Array<IMenuItem> = [];
  public title: string;

  constructor(private navigationService: NavigationService,
    private log: angular.ILogService,
    private q: angular.IQService,
    private state: angular.ui.IStateService,
    private mdSidenav: angular.material.ISidenavService,
    private mdBottomSheet: angular.material.IBottomSheetService,
    private mdToast: angular.material.IToastService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));

    this.title = state.current.data.title;
    navigationService.loadAllItems().then(menuItems => this.menuItems = [].concat(menuItems));
  }

  public selectItem(item) {
    this.title = item.name;
    this.clearSidebars();
    this.showSimpleToast(this.title);
  }

  public showActions($event: MouseEvent) {
    this.mdBottomSheet.show({
      parent: angular.element(document.getElementById('content')),
      templateUrl: 'bottom-sheet/bottom-sheet.tpl.html',
      controller: BottomSheetController,
      controllerAs: 'vm',
      bindToController: true,
      targetEvent: $event
    }).then(clickedItem => {
      clickedItem && this.log.debug(clickedItem.name + ' clicked!');
    });
  }

  public showSimpleToast(title: string) {
    this.mdToast.show(
      this.mdToast.simple()
        .textContent(title)
        .hideDelay(2000)
        .position('bottom right')
    );
  }

  public toggleItemsList() {
    this.mdBottomSheet.hide();
    this.mdSidenav('left').toggle().then(() => this.log.debug('Left sidenav toggled'));
  }

  public toggleRightSidebar() {
    this.mdSidenav('right').toggle().then(() => this.log.debug('Left sidenav toggled'));
  }

  private clearSidebars() {
    this.mdBottomSheet.hide();
    this.mdSidenav('left').close().then(() => this.log.debug('Left sidenav closed'));
    this.mdSidenav('right').close().then(() => this.log.debug('Left sidenav closed'));
  }
}

@at.inject('$mdBottomSheet')
class BottomSheetController {
  public actions = [
    { name: 'Share', icon: 'share', url: 'https://www.google.com' },
    { name: 'Star', icon: 'star', url: 'https://www.google.com' }
  ];

  constructor(private mdBottomSheet: angular.material.IBottomSheetService) {
  }

  public performAction(action) {
    this.mdBottomSheet.hide(action);
  }
}
