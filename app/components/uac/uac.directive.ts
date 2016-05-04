import ngModuleName from './uac.module';

import UacService from './uac.service';

'use strict';

const ngDirectiveName = 'tsfnUac';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A', // default: EA
  // template: '<fieldset ng-transclude style="margin:0;padding:0;border:1px solid red"></fieldset>',
  // transclude: true,
  // replace: true,
  priority: -1,
  link: (scope, element, attrs, ctrl) => {
    let log: angular.ILogService = ctrl['log'],
      compile: angular.ICompileService = ctrl['compile'],
      uac: UacService = ctrl['uac'];

    let enable = flag => {
      // let children = element.find('input,select,button,md-autocomplete,md-checkbox');
      let children = element.find('input,select,button,md-checkbox,md-radio-button,md-autocomplete');
      debugger;
      if (flag) {
        children.removeAttr('disabled');
        element.removeAttr('disabled');
      } else {
        children.each((i, elem) => {
          debugger;
          let ngDisabled = $(elem).attr('ng-disabled');
          if (angular.isDefined(ngDisabled) && ngDisabled != 'false') {
            $(elem).attr('tsfn-ng-disabled', ngDisabled);
          } else {
            $(elem).attr('ng-disabled', 'true');
          }
        });
        // children.attr('disabled', 'disabled');
        element.attr('disabled', 'disabled');
      }
      compile(element.contents())(scope);
    };

    let show = flag => {
      if (flag) {
        attrs.$removeClass('ng-hide');
      } else {
        attrs.$addClass('ng-hide');
      }
    };

    let processAccess = access => {
      log.debug('Access: ' + angular.toJson(access, false));
      if (access.enable) {
        enable(true);
      }
      if (access.visible) {
        show(true);
      }
    };

    let requestAccess = key => {
      log.debug('Requesting access for ' + key);

      enable(false);
      show(false);

      return uac.load(key).then(processAccess);
    };

    attrs.$observe(ngDirectiveName, function (value) {
      requestAccess(value);
    });
  }
})
@at.inject('$log', '$compile', 'tsfnUac')
export default class UacDirective {
  constructor(private log: angular.ILogService,
    private compile: angular.ICompileService,
    private uac: UacService) {
    log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '));
  }
}
