import ngModuleName from './uac.module';

import UacService from './uac.service';

'use strict';

const ngDirectiveName = 'tsfnUac';
const ngDirectiveNameKey = 'tsfnUacKey';

@at.directive(ngModuleName, ngDirectiveNameKey, {
  restrict: 'A',
  link: (scope, element, attrs, ctrl) => {
    let log: angular.ILogService = ctrl['log'],
      uac: UacService = ctrl['uac'];

    let key = attrs[ngDirectiveNameKey];
    log.debug('$uacObj.' + key, 'Default', scope['$uacObj'][key]);

    let processAccess = access => {
      log.debug('$uacObj.' + key, 'Access', access);
      angular.extend(scope['$uacObj'][key], access);
    };

    let requestAccess = key => {
      log.debug('$uacObj.' + key, 'Request access');

      return uac.load(key).then(processAccess);
    };

    requestAccess(key);
  }
})
@at.inject('$log', 'tsfnUac')
class UacDirectiveKey {
  constructor(private log: angular.ILogService,
    private uac: UacService) {
    log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '));
  }
}

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A',
  priority: 1001,
  terminal: true,
  compile: (tElement, tAttrs) => {
    let tVal = tAttrs[ngDirectiveName];
    tAttrs.$set(ngDirectiveNameKey, tVal);

    let myDisabled = tAttrs['ngDisabled'],
      ngDisabled = ['!$uacObj', tVal, 'enable'].join('.');
    if (angular.isDefined(myDisabled)) {
      ngDisabled += ' || ' + myDisabled;
    }
    tAttrs.$set('ngDisabled', ngDisabled);

    let myShow = tAttrs['ngShow'],
      myHide = tAttrs['ngHide'],
      ngShowHide = ['$uacObj', tVal, 'visible'].join('.'),
      attr = 'ngShow';
    if (angular.isDefined(myShow)) {
      ngShowHide += ' || ' + myShow;
    } else if (angular.isDefined(myHide)) {
      ngShowHide = '!' + ngShowHide;
      ngShowHide += ' || ' + myHide;
      attr = 'ngHide';
    }
    tAttrs.$set(attr, ngShowHide);

    tElement.removeAttr('tsfn-uac');
    return (scope, iElement, iAttrs, ctrl) => {
      if (!scope['$uacObj'])
        scope['$uacObj'] = {};

      scope['$uacObj'][tVal] = {
        enable: false,
        visible: false
      };
      ctrl['compile'](tElement)(scope);
    };
  }
})
@at.inject('$log', '$compile')
export default class UacDirective {
  constructor(private log: angular.ILogService,
    private compile: angular.ICompileService) {
    log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '));
  }
}
