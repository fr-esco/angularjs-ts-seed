import ngModuleName from './uac.module';

import UacService from './uac.service';

'use strict';

const ngDirectiveName = 'tsfnUac';

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A', // default: EA
  priority: 10,
  link: (scope, element, attrs, ctrl) => {
    let log: angular.ILogService = ctrl['log'],
      compile: angular.ICompileService = ctrl['compile'],
      uac: UacService = ctrl['uac'];

    let enable = flag => {
      let children = element.find('input,select,button');
      debugger;
      if (flag) {
        children.removeAttr('disabled');
        element.removeAttr('disabled');
      } else {
        angular.forEach(children, (elem: angular.IAugmentedJQuery) => {
          debugger;
          let ngDisabled = elem.attr('ng-disabled');
          if (angular.isDefined(ngDisabled) && ngDisabled != 'false') {
            elem.attr('tsfn-ng-disabled', ngDisabled).removeAttr('ng-disabled');
          }
        });
        children.attr('disabled', 'disabled');
        element.attr('disabled', 'disabled');
      }
      // compile(element.contents())(scope);
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
