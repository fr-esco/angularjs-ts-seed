/// <reference path="../../../typings/browser.d.ts" />

import ngModuleName from './message';
import MessageListComponent from './message-list.component';

'use strict';

let $module = angular.mock.module;
let $inject = angular.mock.inject;
let $dump = (arg: any): void => console.log(angular.mock.dump(arg));

describe('# MessageList Component', () => {
  let log;

  beforeEach(() => {
    $module(ngModuleName);

    $module($provide => {
      $provide.service('messageService', ['$q', function($q) {
        this.loadAllItems = () => $q.when([{
          userPhoto: '/assets/images/user.svg',
          subject: 'Electromagnetic radiation',
          userName: 'Wilhelm Conrad Röntgen',
          date: '1901',
          text: 'In recognition of the extraordinary services he has rendered by the discovery of the remarkable rays subsequently named after him'
        }]);
      }]);
    });

  });

  describe('## With $componentController', () => {
    let controller, scope;

    beforeEach($inject(($log, $rootScope, $componentController) => {
      log = $log;
      scope = $rootScope.$new();
      controller = $componentController('tsfnMessageList', { $scope: scope });
    }));

    it('should be attached to the scope', () => {
      expect(scope.$ctrl).toBe(controller);
    });

    it('should log registration', () => {
      let loaded = ['ngComponent', 'tsfnMessageList', 'loaded'].join(' ');
      expect(log.debug.logs).toContain([loaded]);
    });

    it('should be init', () => {
      expect(controller.messages).toBeEmptyArray();

      controller.$onInit();
      scope.$apply();

      expect(controller.messages).toBeNonEmptyArray();
      controller.messages.forEach(message => {
        expect(message).toHaveNonEmptyString('userPhoto');
        expect(message.userPhoto).toStartWith('/assets');
        expect(message).toHaveNonEmptyString('subject');
        expect(message).toHaveNonEmptyString('userName');
        expect(message).toHaveNonEmptyString('date');
        expect(message).toHaveNonEmptyString('text');
      });
    });
  });
});
