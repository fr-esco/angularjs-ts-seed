import ngModuleName from './notification.module';
import NotificationService from './notification.provider';
import { INotificationConfig } from './notification.provider';
import { INotificationAction } from './notification.provider';

'use strict';

const ngComponentName = 'tsfnNotification';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'notification/notification.component.html'
})
@at.inject('$log', '$mdMedia', '$scope', 'notification')
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
    private notification: NotificationService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $onInit(): void {
    // Watcher used for position overriding for small and medium size devices
    this.scope.$watch(
      () => { return (this.mdMedia('xs') || this.mdMedia('sm')); },
      (override) => {
        if (override) {
          this.toastVerticalPosition = 'bottom';
          this.disableTopPosition = true;
        } else {
          this.disableTopPosition = false;
        }
      }
    );
  }

  public changeToastType(index: number): void {
    this.toastType = this.messageTypes[index].toLowerCase();
  }

  public showToast(): void {
    let config: INotificationConfig = {
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
          value: () => { alert('test2'); },
          label: 'function',
        }
      ];
    }
    switch (this.toastType) {
      case 'success': this.notification.success(this.toastMessages[this.toastMessageIndex], config, actions)
        .then(function (actionValue) {
          if (actionValue) console.log(actionValue);
        });
        break;
      case 'warning': this.notification.warning(this.toastMessages[this.toastMessageIndex], config, actions);
        break;
      case 'error': this.notification.error(this.toastMessages[this.toastMessageIndex], config, actions);
        break;
      case 'info': this.notification.info(this.toastMessages[this.toastMessageIndex], config, actions);
        break;
    }
  }
}
