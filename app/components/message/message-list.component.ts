import ngModuleName from './message.module'
import {IMessage} from './message.service'
import MessageService from './message.service'

'use strict'

const ngComponentName = 'tsngMessageList'

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'components/message/message-list.component.html'
})
export default class MessageListComponent implements at.OnInit {
  public messages: Array<IMessage> = []

  constructor(private messageService: MessageService, private $log: angular.ILogService) {
    'ngInject'
    $log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '))
  }

  public $onInit() {
    this.messageService.loadAllItems().then(
      messages => this.messages = [].concat(messages))
  }
}
