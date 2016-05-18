import {NotificationProvider} from './notification.provider';
'use strict';

const icons = {
  'success': 'check_circle',
  'warning': 'warning',
  'error': 'error',
  'info': 'info'
};
const positions = {
  'top': 'md-top',
  'right': 'md-right',
  'left': 'md-left',
  'bottom': 'md-bottom'
};
export {icons};
export {positions};

let config = (notificationProvider: NotificationProvider) => {
  notificationProvider.delay(0);
  notificationProvider.domParent('md-content');
  notificationProvider.horizontalPosition('right');
  notificationProvider.verticalPosition('top');
  notificationProvider.width(100);
};

config.$inject = ['notificationProvider'];

export default config;
