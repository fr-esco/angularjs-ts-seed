import ngModuleName from './example.module';

'use strict';

const ngControllerName = 'ExampleController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('$interval', '$log', '$scope', '$timeout')
export default class ExampleController {

  public counterTicker: number = 0;
  public counterFrom: number = 0;
  public counterStep: number = 1;
  public counterTimes: number = 0;

  private counterInterval: angular.IPromise<number> = undefined;

  private names: Array<string> = [];

  private int1: number = Math.random();
  private int2: number = Math.random();

  private incrementInterval: angular.IPromise<number> = undefined;
  private incrementIntervalTenTimes: angular.IPromise<number> = undefined;

  constructor(private interval: angular.IIntervalService,
    private log: angular.ILogService,
    private scope: angular.IScope,
    private timeout: angular.ITimeoutService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));

    this.incrementInterval = this.interval(this.increment1, 1000);
    this.incrementIntervalTenTimes = this.interval(this.increment2, 1000, 10);
    // Note: we should always have this code in place, to ensure we don't leak intervals.
    // Ensure that we always close any running intervals when a controller instance is un-loaded.
    scope.$on('$destroy', () => this.cancelIntervals());
  }

  public addName(newName: string) {
    this.names.push(newName);
  }

  public addNameAsync(newName: string, delay: number = 500) {
    this.timeout(() => this.addName(newName), delay);
  }

  public readNames = () => angular.copy(this.names);

  public listNames = (glue: string = ','): string => this.names.join(glue);

  public cancelIntervals = () => {
    if (angular.isDefined(this.incrementInterval)) {
      this.interval.cancel(this.incrementInterval);
      this.incrementInterval = undefined;
    }
    if (angular.isDefined(this.incrementIntervalTenTimes)) {
      this.interval.cancel(this.incrementIntervalTenTimes);
      this.incrementIntervalTenTimes = undefined;
    }
    if (angular.isDefined(this.counterInterval)) {
      this.interval.cancel(this.counterInterval);
      this.counterInterval = undefined;
    }
  };

  public destroy = () => this.scope.$destroy();

  public increment1 = () => this.int1 += 1;

  public increment2 = () => this.int2 += 1;

  public counterLogic = (start: number = 0, step: number = 1) =>
    this.counterTicker = (this.counterTicker === 0 ? start : this.counterTicker) + step;

  public counterStart = () =>
    this.counterInterval = this.interval(this.counterLogic, 1000, this.counterTimes, true, this.counterFrom, this.counterStep);
}
