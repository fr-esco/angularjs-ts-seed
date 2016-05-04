import ngModuleName from './uac.module';

import UacService from './uac.service';

'use strict';

const ngDirectiveName = 'tsfnUacConfigPoint';
const ngDirectiveNameReady = 'tsfnUacConfigPointReady';

const prefix = 'tsfn',
  implication = 'UacImplication',
  name = 'UacName',
  implicationList = ['visible', '!visible', 'editable', '!editable'];

function genKey(tAttrs: angular.IAttributes) {
  let myImplication: string = tAttrs[prefix + implication],
    visible = myImplication.indexOf('visible'),
    editable = myImplication.indexOf('editable');
  let myName: string = tAttrs[prefix + name];
  return [myName, visible ? 'visible' : editable ? 'editable' : null].join(':');
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
      ngShowHide = ['$uacObj["', genKey(tAttrs), '"]'].join(''),
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
      ngDisabled = ['!$uacObj["', genKey(tAttrs), '"]'].join('');
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

@at.directive(ngModuleName, ngDirectiveName, {
  restrict: 'A',
  priority: 1001,
  terminal: true,
  compile: (tElement, tAttrs) => {
    tAttrs.$set(ngDirectiveNameReady, true);

    validateAttributes(tAttrs);
    visibleScenario(tAttrs);
    editableScenario(tAttrs);

    tElement.removeAttr('tsfn-uac-config-point');

    return (scope, iElement, iAttrs, ctrl) => {
      if (!scope['$uacObj'])
        scope['$uacObj'] = {};

      scope['$uacObj'][genKey(tAttrs)] = undefined;
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
  link: (scope, element, attrs, ctrl) => {
    validateAttributes(attrs);

    let log: angular.ILogService = ctrl['log'],
      uac: UacService = ctrl['uac'];

    let key = genKey(attrs);
    log.debug(['$uacObj["', key, '"]'].join(''), 'Default', scope['$uacObj'][key]);

    let processAccess = access => {
      log.debug(['$uacObj["', key, '"]'].join(''), 'Access', access);
      angular.extend(scope['$uacObj'][key], access);
    };

    let requestAccess = () => {
      log.debug(['$uacObj["', key, '"]'].join(''), 'Request access');

      let myImplication: string = attrs[prefix + implication];
      let myName: string = attrs[prefix + name];
      return uac.loadConfigPoint(myName, myImplication).then(processAccess);
    };

    requestAccess();
  }
})
@at.inject('$log', 'tsfnUac')
class UacDirectiveKey {
  constructor(private log: angular.ILogService,
    private uac: UacService) {
    log.debug(['ngDirective', ngDirectiveName, 'loaded'].join(' '));
  }
}
