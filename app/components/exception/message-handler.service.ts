import ngModuleName from './exception.module';

'use strict';

const ngServiceName = 'messageHandler';

interface IMessage {
  level: number;
}

@at.service(ngModuleName, ngServiceName)
@at.inject('$log', '$q')
export default class MessageHandlerService {
  private get ERROR() { return 2; }
  private get WARN() { return 1; }
  private get INFO() { return 0; }

  private get levelList() {
    return ['INFO', 'WARN', 'ERROR'];
  }

  private messageList = [[], [], []];

  constructor(private log: angular.ILogService, private q: angular.IQService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public add(message: IMessage) {
    switch (message.level) {
      case this.ERROR:
        this.addError(message);
        break;
      case this.WARN:
        this.addWarn(message);
        break;
      case this.INFO:
        this.addInfo(message);
        break;
      default:
        throw new TypeError('Invalid Message Level: ' + message.level);
    }
  }

  public fetch(level: number, index = -1, clear = false) {
    if (this.validateLevel(level)) {
      if (index > -1) {
        if (clear)
          return this.messageList[level].splice(index, 1)[0];
        else
          return this.messageList[level][index];
      } else {
        if (clear) {
          let out = [].concat(this.messageList[level]);
          this.messageList[level] = [];
          return out;
        }
        else
          return [].concat(this.messageList[level]);
      }
    } else
      throw new TypeError('Invalid Message Level: ' + level);
  }

  public addError(message: IMessage | Error) {
    this.messageList[this.ERROR].push(message);
  }
  public addWarn(message: IMessage | Error) {
    this.messageList[this.WARN].push(message);
  }
  public addInfo(message: IMessage | Error) {
    this.messageList[this.INFO].push(message);
  }

  public fectError(index = -1, clear = false) {
    return this.fetch(this.ERROR, index = -1, clear = false);
  }
  public fectWarn(index = -1, clear = false) {
    return this.fetch(this.WARN, index = -1, clear = false);
  }
  public fectInfo(index = -1, clear = false) {
    return this.fetch(this.INFO, index = -1, clear = false);
  }

  public flush(level?: number) {
    if (this.validateLevel(level)) {
      let spool: angular.ILogCall = this.log.debug;
      switch (level) {
        case this.ERROR:
          spool = this.log.error;
          break;
        case this.WARN:
          spool = this.log.warn;
          break;
        case this.INFO:
          spool = this.log.info;
          break;
        default:
          throw new TypeError('Invalid Message Level: ' + level);
      }
      if (this.messageList[level].length > 0) {
        this.messageList[level].forEach(message => spool(message));
        this.messageList[level] = [];
      } else
        this.log.debug(`Empty List: ${this.levelList[level]}.`);
    } else {
      this.flush(this.ERROR);
      this.flush(this.WARN);
      this.flush(this.INFO);
    }
  }

  private validateLevel(level) {
    return angular.isNumber(level) && isFinite(level)
      && level >= 0 && level < this.messageList.length;
  }
}
