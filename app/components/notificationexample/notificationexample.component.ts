import ngModuleName from './notificationexample.module';
import NotificationService from 'components/notification/notification.provider';
import { INotificationConfig } from 'components/notification/notification.provider';
import { INotificationAction } from 'components/notification/notification.provider';

'use strict';

const ngComponentName = 'tsfnNotificationExample';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'notificationexample/notificationexample.component.html'
})
@at.inject('$log', '$mdMedia', '$scope', 'notification', 'hotkeys')
export default class NotificationComponent {

  public messageTypes: string[] = ['Success', 'Warning', 'Error', 'Info'];
  public toastMessages: string[] = [
    'Your data has been saved successfully.',
    'A problem has been occurred while submitting your data.',
    'There is a problem with your network connection',
    'Please read the documentation carefully.',
    'Lorem ipsum dolor sit amet, ius id impetus nominavi, at amet mutat usu, hinc accusam eu pro. Lorem ipsum dolor sit amet, ius id impetus nominavi.'
  ];
  public toastDelay: number = 0;
  public toastHorizontalPosition: string = 'right';
  public toastVerticalPosition: string = 'top';
  public toastWidth: number = 100;
  public toastType: string = 'success';
  public toastMessageIndex: number = 0;
  public disableTopPosition: boolean = false;
  public showActionButtons: boolean = false;

  constructor(private log: angular.ILogService,
    private mdMedia: angular.material.IMedia,
    private scope: angular.IScope,
    private notification: NotificationService,
    private hotkeys) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $onInit(): void {
    // Watcher used for position overriding for small and medium size devices
    this.scope.$watch(
      () => this.mdMedia('xs') || this.mdMedia('sm'),
      (override) => {
        if (override) {
          this.toastVerticalPosition = 'bottom';
          this.disableTopPosition = true;
        } else {
          this.disableTopPosition = false;
        }
      }
    );

    this.hotkeys.add({
      combo: 'alt+c',
      description: 'Close notification',
      callback: (event, hotkey) => {
        event.preventDefault();
        this.notification.close();
      }
    });
  }

  public changeToastType(index: number): void {
    this.toastType = this.messageTypes[index].toLowerCase();
  }

  public showToast(): void {
    const config: INotificationConfig = {
      verticalPos: this.toastVerticalPosition,
      horizontalPos: this.toastHorizontalPosition,
      delay: this.toastDelay,
      width: this.toastWidth
    };
    let actions: INotificationAction[] = [];
    if (this.showActionButtons) {
      actions = [
        {
          value: 'action1',
          label: 'string',
          icon: 'done'
        },
        {
          value: () => alert('test2'),
          label: 'function',
        }
      ];
    }
    let message = this.toastMessages[this.toastMessageIndex];
    let toast: angular.IPromise<angular.material.IToastService>;
    switch (this.toastType) {
      case 'success':
        toast = this.notification.success(message, config, actions);
        break;
      case 'warning':
        toast = this.notification.warning(message, config, actions);
        break;
      case 'error':
        toast = this.notification.error(message, config, actions);
        break;
      case 'info':
        toast = this.notification.info(message, config, actions);
        break;
      default:
        throw new TypeError('Invalid Toas Type: ' + this.toastType);
    }
    toast.then(actionValue => this.log.debug(actionValue));
  }
}
