import {NotificationProvider} from './notification.provider';
'use strict';

const icons = {
  'success': 'check_circle',
  'warning': 'warning',
  'error': 'error',
  'info': 'info'
};
const positions = {
  'top': 'toast-top',
  'right': 'toast-right',
  'left': 'toast-left',
  'bottom': 'toast-bottom'
};
export {icons};
export {positions};

let config = (notificationProvider: NotificationProvider) => {
  notificationProvider.delay(0);
  notificationProvider.domParent('#notification_component_content');
  notificationProvider.horizontalPosition('right');
  notificationProvider.verticalPosition('top');
  notificationProvider.width(100);
};

config.$inject = ['notificationProvider'];

export default config;
