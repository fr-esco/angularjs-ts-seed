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

export {INotificationConfig, INotificationAction};

interface INotificationProvider extends angular.IServiceProvider {
  delay(delay: number);
  width(width: number);
  verticalPosition(vPos: string);
  horizontalPosition(hPos: string);
  domParent(parent: string);
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

  public delay(delay: number) {
    this.config.delay = delay;
    return this;
  }

  public width(width: number) {
    this.config.width = width;
    return this;
  }

  public verticalPosition(vPos: string) {
    this.config.verticalPos = vPos;
    return this;
  }

  public horizontalPosition(hPos: string) {
    this.config.horizontalPos = hPos;
    return this;
  }

  public domParent(par: string) {
    this.config.domParent = par;
    return this;
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

    let delay = (cfg && (cfg.delay >= 0)) ? cfg.delay : this.config.delay;
    let domParent = (cfg && cfg.domParent) ? cfg.domParent : this.config.domParent;
    let horizontalPos = (cfg && cfg.horizontalPos) ? cfg.horizontalPos : this.config.horizontalPos;
    let verticalPos, width;

    // Override vertical position to 'bottom' and width to 'flex-100' for xs and sm devices
    if (this.mdMedia('xs') || this.mdMedia('sm')) {
      width = 100;
      verticalPos = 'bottom';
    } else {
      width = (cfg && cfg.width) ? cfg.width : this.config.width;
      verticalPos = (cfg && cfg.verticalPos) ? cfg.verticalPos : this.config.verticalPos;
    }

    let toast = this.mdToast;
    return toast.show({
      template: `
        <md-toast class="toast-{{toast.type}} {{toast.verticalPos}} {{toast.horizontalPos}} flex-{{toast.width}}" layout="row">
          <md-icon class="toast-icon" flex="noshrink">{{toast.icon}}</md-icon>
          <p class="md-toast-text" flex="grow">{{toast.message}}</p>
          <md-button flex="noshrink" ng-repeat="a in toast.actions" class="md-flat" aria-label="Close message" ng-click='toast.action(a.value)'>
            <md-icon ng-if="a.icon" class="toast-icon">{{a.icon}}</md-icon>
            {{a.label}}
          </md-button>
          <md-button class="md-icon-button" flex="noshrink" aria-label="Close message" ng-click="toast.action('close')">
            <md-icon class="toast-icon">close</md-icon>
          </md-button>
        </md-toast>
      `,
      bindToController: true,
      controller: function () {
        this.action = (action) => {
          if (typeof action === 'function') {
            this.hide(action());
          } else {
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
      parent: domParent,
      position: [verticalPos, horizontalPos].join(' ')
    });
  }
}
