import ngModuleName from './main.module'
import {IMenuItem} from '../common/navigation-menu.model'
import NavigationService from '../common/navigation.service'
import BottomSheetController from '../bottom-sheet/bottom-sheet.controller'

'use strict'

const ngComponentName = 'tsngMain'

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'components/main/main.component.html',
  $routeConfig: [
    { path: '/dashboard', name: 'Dashboard', component: 'tsngDashboard', data: { title: 'Dashboard' }, useAsDefault: true },
    { path: '/profile', name: 'Profile', component: 'tsngProfile', data: { title: 'Profile' } },
    { path: '/table/...', name: 'Table', component: 'tsngTable', data: { title: 'Table' } },
    { path: '/blog/...', name: 'Blog', component: 'tsngBlog', data: { title: 'Blog' } },
    { path: '/i18n', name: 'I18n', component: 'tsngI18n', data: { title: 'i18n' } }
  ]
})
export default class MainComponent implements at.OnInit {

  public menuItems: Array<IMenuItem> = []
  public title: string

  constructor(private navigationService: NavigationService,
    private $log: angular.ILogService,
    private $q: angular.IQService,
    private $mdSidenav: angular.material.ISidenavService,
    private $mdBottomSheet: angular.material.IBottomSheetService,
    private $mdMenu: angular.material.IMenuService,
    private $mdToast: angular.material.IToastService) {
    'ngInject'
    $log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '))
  }

  public $onInit() {
    this.navigationService.loadAllItems()
      .then(menuItems => this.menuItems = [].concat(menuItems))
  }

  public selectItem(item) {
    this.title = item.name
    this.clearSidebars()
    this.showSimpleToast(this.title)
  }

  public showActions($event: MouseEvent) {
    this.$mdBottomSheet.show({
      parent: angular.element(document.getElementById('content')),
      templateUrl: 'components/bottom-sheet/bottom-sheet.controller.tpl.html',
      controller: BottomSheetController,
      controllerAs: 'vm'
    }).then(clickedItem => {
      clickedItem && this.$log.debug(clickedItem.name + ' clicked!')
    })
  }

  public showSimpleToast(title: string) {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent(title)
        .hideDelay(2000)
        .position('bottom right')
    )
  }

  public toggleItemsList() {
    this.$mdBottomSheet.hide()
    this.$mdSidenav('left').toggle().then(() => this.$log.debug('Left sidenav toggled'))
  }

  public toggleRightSidebar() {
    this.$mdMenu.hide()
      .then(this.$mdSidenav('right').toggle)
      .then(() => this.$log.debug('Right sidenav toggled'))
  }

  private clearSidebars() {
    this.$mdBottomSheet.hide()
    this.$mdSidenav('left').close().then(() => this.$log.debug('Left sidenav closed'))
    this.$mdSidenav('right').close().then(() => this.$log.debug('Right sidenav closed'))
  }
}
