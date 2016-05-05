import ngModuleName from './uac.module';

import UacService from './uac.service';

'use strict';

const ngDirectiveName = 'tsfnUacCp';
const ngDirectiveNameReady = 'tsfnUacCpReady';
const ngUacObject = '$uacObj';

const prefix = 'tsfn',
  implication = 'UacImplication',
  name = 'UacName',
  implicationList = ['visible', '!visible', 'editable', '!editable'];

function genKey(tAttrs: angular.IAttributes) {
  let myImplication: string = tAttrs[prefix + implication];
  let myName: string = tAttrs[prefix + name];
  return [myName, myImplication].join(':');
}

function validateAttributes(tAttrs: angular.IAttributes) {
  let myImplication: string = tAttrs[prefix + implication];
  if (!myImplication || implicationList.indexOf(myImplication.toLowerCase()) < 0)
    throw new TypeError('Invalid UAC Implication: ' + myImplication);

  let myName: string = tAttrs[prefix + name];
  if (!myName)
    throw new TypeError('Invalid UAC Name: ' + myName);
}

function visibleScenario(tAttrs: angular.IAttributes) {
  let myImplication: string = tAttrs[prefix + implication],
    visible = myImplication.indexOf('visible');

  if (visible > -1) {
    // we are in visible scenario
    let myShow = tAttrs['ngShow'],
      myHide = tAttrs['ngHide'],
      ngShowHide = [ngUacObject, '["', genKey(tAttrs), '"]'].join(''),
      attr = 'ngShow';
    if (visible === 1) {
      // negative case
      ngShowHide = '!' + ngShowHide;
    }

    if (angular.isDefined(myShow)) {
      ngShowHide += ' || ' + myShow;
    } else if (angular.isDefined(myHide)) {
      ngShowHide = '!' + ngShowHide;
      ngShowHide += ' || ' + myHide;
      attr = 'ngHide';
    }
    tAttrs.$set(attr, ngShowHide);
  }
}

function editableScenario(tAttrs: angular.IAttributes) {
  let myImplication: string = tAttrs[prefix + implication],
    editable = myImplication.indexOf('editable');

  if (editable > -1) {
    // we are in editable scenario
    let myDisabled = tAttrs['ngDisabled'],
      ngDisabled = ['!', ngUacObject, '["', genKey(tAttrs), '"]'].join('');
    if (editable === 1) {
      // negative case
      ngDisabled = '!' + ngDisabled;
    }
    if (angular.isDefined(myDisabled)) {
      ngDisabled += ' || ' + myDisabled;
    }
    tAttrs.$set('ngDisabled', ngDisabled);
  }
}
/*
@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A',
  controllerAs: '',
  priority: 1001,
  terminal: true,
  compile: (tElement, tAttrs) => {
    let tVal = tAttrs[ngDirectiveName];
    tAttrs.$set(ngDirectiveNameReady, tVal);

    validateAttributes(tAttrs);
    visibleScenario(tAttrs);
    editableScenario(tAttrs);

    tElement.removeAttr('tsfn-uac-cp');

    return (scope, iElement, iAttrs, ctrl) => {
      if (!scope[ngUacObject])
        scope[ngUacObject] = {};

      scope[ngUacObject][genKey(tAttrs)] = null;
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

@at.directive(ngModuleName, ngDirectiveNameReady, {
  restrict: 'A',
  controllerAs: '',
  link: (scope, element, attrs, ctrl) => {
    validateAttributes(attrs);

    let log: angular.ILogService = ctrl['log'],
      uac: UacService = ctrl['uac'];

    let key = genKey(attrs);
    log.debug([ngUacObject, '["', key, '"]'].join(''), 'Default', scope['$uacObj'][key]);

    let processAccess = access => {
      log.debug([ngUacObject, '["', key, '"]'].join(''), 'Access', access);
      scope['$uacObj'][key] = access;
    };

    let requestAccess = () => {
      log.debug([ngUacObject, '["', key, '"]'].join(''), 'Request access');

      let myImplication: string = attrs[prefix + implication];
      let myName: string = attrs[prefix + name];
      return uac.loadConfigPoint(myName, myImplication).then(processAccess);
    };

    requestAccess();
  }
})
@at.inject('$log', 'tsfnUac')
class UacDirectiveReady {
  constructor(private log: angular.ILogService,
    private uac: UacService) {
    log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '));
  }
}
*/

function uacDirective(log: angular.ILogService, compile: angular.ICompileService) {
  return {
    restrict: 'A',
    priority: 1001,
    terminal: true,
    compile: (tElement, tAttrs) => {
      let tVal = tAttrs[ngDirectiveName];
      tAttrs.$set(ngDirectiveNameReady, tVal);

      validateAttributes(tAttrs);
      visibleScenario(tAttrs);
      editableScenario(tAttrs);

      tElement.removeAttr('tsfn-uac-cp');

      return (scope) => {
        if (!scope[ngUacObject])
          scope[ngUacObject] = {};

        scope[ngUacObject][genKey(tAttrs)] = null;
        compile(tElement)(scope);
      };
    }
  };
}

uacDirective.$inject = ['$log', '$compile'];

function uacDirectiveReady(log: angular.ILogService, uac: UacService) {
  return {
    restrict: 'A',
    link: (scope, element, attrs, ctrl) => {
      validateAttributes(attrs);

      let key = genKey(attrs);
      log.debug([ngUacObject, '["', key, '"]'].join(''), 'Default', scope['$uacObj'][key]);

      let processAccess = access => {
        log.debug([ngUacObject, '["', key, '"]'].join(''), 'Access', access);
        scope['$uacObj'][key] = access;
      };

      let requestAccess = () => {
        log.debug([ngUacObject, '["', key, '"]'].join(''), 'Request access');

        let myImplication: string = attrs[prefix + implication];
        let myName: string = attrs[prefix + name];
        return uac.loadConfigPoint(myName, myImplication).then(processAccess);
      };

      requestAccess();
    }
  };
}

uacDirectiveReady.$inject = ['$log', 'tsfnUac'];

angular.module(ngModuleName)
  .directive(ngDirectiveName, uacDirective)
  .directive(ngDirectiveNameReady, uacDirectiveReady);
