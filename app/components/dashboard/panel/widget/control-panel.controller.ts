import ngModuleName from './widget.module';

'use strict';

const ngControllerName = 'ControlPanelController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('$log', '$interval', '$mdDialog')
export default class ControlPanelController {
  public buttonEnabled = false;
  public determinateValue = 10;
  public reloadServer = 'Staging';
  public showProgress = false;

  constructor(private log: angular.ILogService,
    private interval: angular.IIntervalService,
    private mdDialog: angular.material.IDialogService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));
  }

  public performProgress() {
    this.showProgress = true;
    let interval = this.interval(() => {
      this.determinateValue += 1;
      if (this.determinateValue > 100) {
        this.determinateValue = 10;
        this.showProgress = false;
        this.showAlert();
        this.interval.cancel(interval);
      }
    }, 50, 0, true);
  }

  private showAlert() {
    let alert = this.mdDialog.alert()
      .title('Reloading done!')
      .textContent(this.reloadServer + ' server reloaded.')
      .ok('Close');
    this.mdDialog
      .show(alert)
      .finally(() => alert = undefined);
  }
}
