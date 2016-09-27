import ngModuleName from './common.module'
import {IMenuItem} from './navigation-menu.model'

'use strict'

const ngServiceName = 'navigationService'

@at.service(ngModuleName, ngServiceName)
export default class NavigationService {
  private menuItems: Array<IMenuItem> = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      sref: '.dashboard',
      link: ['Dashboard']
    },
    {
      name: 'Profile',
      icon: 'person',
      sref: '.profile',
      link: ['Profile']
    },
    {
      name: 'Table',
      icon: 'view_module',
      sref: '.table',
      link: ['Table']
    },
    {
      name: 'Blog',
      icon: 'comment',
      sref: '.blog',
      link: ['Blog']
    },
    {
      name: 'I18n',
      icon: 'translate',
      sref: '.i18n',
      link: ['I18n']
    }
  ]

  constructor(private $log: angular.ILogService, private $q: angular.IQService) {
    'ngInject'
    $log.debug(['ngService', ngServiceName, 'loaded'].join(' '))
  }

  public loadAllItems() {
    return this.$q.when(this.menuItems)
  }

}
