import ngModuleName from './message.module';
import {IMessage} from './message.service';
import MessageService from './message.service';

'use strict';

const ngComponentName = 'tsfnMessageList';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'message/message-list.component.html'
})
@at.inject('messageService', '$log')
export default class MessageListComponent implements at.OnInit {
  public messages: Array<IMessage> = [];

  constructor(private messageService: MessageService, private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $onInit() {
    this.messageService.loadAllItems().then(
      messages => this.messages = [].concat(messages));
  }
}
