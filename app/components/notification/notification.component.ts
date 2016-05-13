import ngModuleName from './notification.module';

'use strict';

const ngComponentName = 'tsfnNotification';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'notification/notification.component.html'
})
@at.inject('$log', '$mdToast')
export default class NotificationComponent {
  public promiseAction = true; // Action used when toast is closed
  public messageTypes = ['Success', 'Warning', 'Error', 'Info'];
  public delay = 0;
  public toastHorizontalPosition = 'right';
  public toastVerticalPosition = 'top';
  public toastWidth = 100;
  public toastType = 'success';
  public toastMessageIndex = 0;
  public toastMessages = [
    'Your data has been saved successfully.',
    'A problem has been occurred while submitting your data.',
    'There is a problem with your network connection',
    'Please read the documentation carefully.',
    'Lorem ipsum dolor sit amet, ius id impetus nominavi, at amet mutat usu, hinc accusam eu pro. Lorem ipsum dolor sit amet, ius id impetus nominavi'];

  constructor(private log: angular.ILogService,
    private mdToast: angular.material.IToastService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public changeToastType(index: number) {
    this.toastType = this.messageTypes[index].toLowerCase();
  }

  public showToast() {
    let toast = this.mdToast;
    return toast.show({
      template: `
        <md-toast class='toast-{{ctrl.type}} toast-{{ctrl.verticalPos}}-{{ctrl.horizontalPos}}' flex-sm="100" flex-xs="100" flex-gt-sm="{{ctrl.width}}">
          <i class="material-icons" id="toast-icon" flex="auto"></i>
          <span class="md-toast-text" flex="auto">{{ctrl.message}}</span>
          <md-button flex="nogrow" class="md-flat md-primary md-action" aria-label="Close message" ng-click='ctrl.close()'>
            <i class="material-icons">close</i>
          </md-button>
        </md-toast>
      `,
      bindToController: true,
      controller: function ($log) {
        this.close = function () {
          toast.hide();
          $log.info(this.promiseAction);
        };
      },
      controllerAs: 'ctrl',
      locals: {
        type: this.toastType,
        message: this.toastMessages[this.toastMessageIndex],
        promiseAction: this.promiseAction,
        verticalPos: this.toastVerticalPosition,
        horizontalPos: this.toastHorizontalPosition,
        width: this.toastWidth
      },
      hideDelay: this.delay,
      parent: 'md-content',
      position: this.toastVerticalPosition + ' ' + this.toastHorizontalPosition
    });
  }
}
