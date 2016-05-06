import ngModuleName from './uac.module';

import UacService from './uac.service';

'use strict';

const ngDirectiveName = 'tsfnUacPerm';
const ngDirectiveNameReady = 'tsfnUacPermReady';
const ngUacObject = '$uacObj';

const prefix = 'tsfn',
  implication = 'UacImplication',
  object = 'UacObject',
  operation = 'UacOperation',
  implicationList = ['visible', '!visible', 'editable', '!editable'],
  operationList = ['all', 'delete', 'update', 'create', 'execute', 'read'];

function genKey(tAttrs: angular.IAttributes) {
  let myImplication: string = tAttrs[prefix + implication];
  let myObject: string = tAttrs[prefix + object];
  let myOperation: string = tAttrs[prefix + operation];
  return [myObject, myOperation, myImplication].join(':');
}

function validateAttributes(tAttrs: angular.IAttributes) {
  let myImplication: string = tAttrs[prefix + implication];
  if (!myImplication || implicationList.indexOf(myImplication.toLowerCase()) < 0)
    throw new TypeError('Invalid UAC Implication: ' + myImplication);

  let myObject: string = tAttrs[prefix + object];
  if (!myObject)
    throw new TypeError('Invalid UAC Object: ' + myObject);

  let myOperation: string = tAttrs[prefix + operation];
  if (!myOperation || operationList.indexOf(myOperation.toLowerCase()) < 0)
    throw new TypeError('Invalid UAC Operation: ' + myOperation);
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

function uacDirective(log: angular.ILogService,
  compile: angular.ICompileService,
  rootScope: angular.IRootScopeService) {
  return {
    restrict: 'A',
    priority: 1001,
    terminal: true,
    compile: (tElement, tAttrs) => {
      let tVal = tAttrs[ngDirectiveName];
      tAttrs.$set(ngDirectiveNameReady, tVal);

      let isSet = input => angular.isDefined(input) && input !== null;

      if (isSet(tVal)) {
        tVal = rootScope.$eval(tVal) || {};
        if (isSet(tVal.implication))
          tAttrs.$set(prefix + implication, tVal.implication);
        if (isSet(tVal.object))
          tAttrs.$set(prefix + object, tVal.object);
        if (isSet(tVal.operation))
          tAttrs.$set(prefix + operation, tVal.operation);
      }

      validateAttributes(tAttrs);
      visibleScenario(tAttrs);
      editableScenario(tAttrs);

      tElement.removeAttr('tsfn-uac-perm');

      return (scope) => {
        if (!scope[ngUacObject])
          scope[ngUacObject] = {};

        scope[ngUacObject][genKey(tAttrs)] = null;
        compile(tElement)(scope);
      };
    }
  };
}

uacDirective.$inject = ['$log', '$compile', '$rootScope'];

function uacDirectiveReady(log: angular.ILogService, uac: UacService) {
  return {
    restrict: 'A',
    link: (scope, element, attrs, ctrl) => {
      validateAttributes(attrs);

      let key = genKey(attrs);
      log.debug([ngUacObject, '["', key, '"]'].join(''), 'Default', scope[ngUacObject][key]);

      let processAccess = access => {
        log.debug([ngUacObject, '["', key, '"]'].join(''), 'Access', access);
        scope['$uacObj'][key] = access;
      };

      let requestAccess = () => {
        log.debug([ngUacObject, '["', key, '"]'].join(''), 'Request access');

        let myImplication: string = attrs[prefix + implication];
        let myObject: string = attrs[prefix + object];
        let myOperation: string = attrs[prefix + operation];
        return uac.loadPermission(myObject, myOperation, myImplication).then(processAccess);
      };

      requestAccess();
    }
  };
}

uacDirectiveReady.$inject = ['$log', 'tsfnUac'];

angular.module(ngModuleName)
  .directive(ngDirectiveName, uacDirective)
  .directive(ngDirectiveNameReady, uacDirectiveReady);
