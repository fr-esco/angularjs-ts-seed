import ngModuleName from './notification.module';
import {positions} from './notification.config';
import {icons} from './notification.config';

'use strict';

// the provider will be available as 'notificationProvider'
// the created service will be available as 'notification'
const ngProviderName = 'notification';

interface INotificationConfig {
  delay?: number;
  verticalPos?: string;
  horizontalPos?: string;
  width?: number;
  domParent?: string;
}

interface INotificationAction {
  value: string | Function;
  label: string;
  icon?: string;
}

export {INotificationConfig};
export {INotificationAction};

interface INotificationProvider extends angular.IServiceProvider {
  delay(delay: number): void;
  width(width: number): void;
  verticalPosition(vPos: string): void;
  horizontalPosition(hPos: string): void;
  domParent(parent: string): void;
}

@at.provider(ngModuleName, ngProviderName)
export class NotificationProvider implements INotificationProvider {

  private config: INotificationConfig;
  /**
   * Default constructor: define default fallback configuration 
   * if it is not specified during angular.module.config()
   */
  constructor() {
    this.config = {
      delay: 0,
      verticalPos: positions['top'],
      horizontalPos: positions['right'],
      width: 100,
      domParent: 'md-content'
    };
  }
  public delay(delay: number): void {
    this.config.delay = delay;
  }
  public width(width: number): void {
    this.config.width = width;
  }
  public verticalPosition(vPos: string): void {
    this.config.verticalPos = vPos;
  }
  public horizontalPosition(hPos: string): void {
    this.config.horizontalPos = hPos;
  }
  public domParent(par: string): void {
    this.config.domParent = par;
  }

  // $get must be declared as method, not as function property (eg. `$get = () => new Service();`)
  @at.injectMethod('$log', '$mdToast', '$mdMedia')
  public $get(log: angular.ILogService,
    mdToast: angular.material.IToastService,
    mdMedia: angular.material.IMedia) {
    return new NotificationProviderService(log, mdToast, mdMedia, this.config);
  }
}

export default class NotificationProviderService {

  constructor(private log: angular.ILogService,
    private mdToast: angular.material.IToastService,
    private mdMedia: angular.material.IMedia,
    private config: INotificationConfig) {
    let s = ['ngProvider', ngProviderName, 'has loaded an', 'NotificationProviderService'].join(' ');
    log.debug(s);
  }
  /**
   * CONFIGURATION METHODS
   */
  /*public delay(delay: number): void {
    this.config.delay = delay;
    console.log('service: update delay');
  }
  public width(width: number): void {
    this.config.width = width;
    console.log('service: update width');
  }
  public verticalPosition(vPos: string): void {
    this.config.verticalPos = positions[vPos];
    console.log('service: update vpos');
  }
  public horizontalPosition(hPos: string): void {
    this.config.horizontalPos = positions[hPos];
    console.log('service: update hpos');
  }
  public domParent(par: string): void {
    this.config.domParent = par;
    console.log('service: update DOM');
  }*/
  /**
   * 
   */
  public success(message: string, config?: INotificationConfig, actions?: INotificationAction[]): angular.IPromise<angular.material.IToastService> {
    return this.show('success', message, config, actions);
  }
  public warning(message: string, config?: INotificationConfig, actions?: INotificationAction[]): angular.IPromise<angular.material.IToastService> {
    return this.show('warning', message, config, actions);
  }
  public error(message: string, config?: INotificationConfig, actions?: INotificationAction[]): angular.IPromise<angular.material.IToastService> {
    return this.show('error', message, config, actions);
  }
  public info(message: string, config?: INotificationConfig, actions?: INotificationAction[]): angular.IPromise<angular.material.IToastService> {
    return this.show('info', message, config, actions);
  }
  private show(type: string, message: string, cfg?: INotificationConfig, actions?: INotificationAction[]): angular.IPromise<angular.material.IToastService> {

    let width = (cfg && cfg.width) ? cfg.width : this.config.width;
    let verticalPos = (cfg && cfg.verticalPos) ? cfg.verticalPos : this.config.verticalPos;
    let horizontalPos = (cfg && cfg.horizontalPos) ? cfg.horizontalPos : this.config.horizontalPos;
    let delay = (cfg && (cfg.delay >= 0)) ? cfg.delay : this.config.delay;
    let domParent = (cfg && cfg.domParent) ? cfg.domParent : this.config.domParent;

    let toast = this.mdToast;
    return toast.show({
      template: `
        <md-toast class='toast-{{toast.type}} {{toast.verticalPos}} {{toast.horizontalPos}}' flex-sm="100" flex-xs="100" flex-gt-sm="{{toast.width}}">
          <md-icon class="toast-icon">{{toast.icon}}</md-icon>
          <p class="md-toast-text" flex="auto">{{toast.message}}</p>
          <md-button ng-repeat="a in toast.actions" class="md-flat" aria-label="Close message" ng-click='toast.action(a.value)'>
            <md-icon ng-if="a.icon" class="toast-icon">{{a.icon}}</md-icon>
            {{a.label}}
          </md-button>
          <md-button class="md-icon-button" aria-label="Close message" ng-click="toast.action('close')">
            <md-icon class="toast-icon">close</md-icon>
          </md-button>
        </md-toast>
      `,
      bindToController: true,
      controller: function () {
        this.action = (action) => {
          if (typeof(action) == 'function'){
            this.hide(action());
          }else{
            this.hide(action);
          }
        };
      },
      controllerAs: 'toast',
      locals: {
        hide: toast.hide,
        type: type,
        icon: icons[type],
        message: message,
        width: width,
        verticalPos: positions[verticalPos],
        horizontalPos: positions[horizontalPos],
        actions: actions || []
      },
      hideDelay: delay,
      parent: domParent
      // position: positions[verticalPos] + ' ' + positions[horizontalPos]
    });
  }
}
