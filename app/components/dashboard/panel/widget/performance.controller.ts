import ngModuleName from './widget.module';

import {IPerformance} from './performance.model';
import PerformanceService from './performance.service';

'use strict';

const ngControllerName = 'PerformanceController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('performanceService', '$log', '$q')
export default class PerformanceController {

  public performanceChartData: Array<IPerformance> = [];
  public performancePeriod = 'week';
  public chartOptions = {
    chart: {
      type: 'stackedAreaChart',
      height: 350,
      margin: { left: -15, right: -15 },
      x: d => d[0],
      y: d => d[1],
      showLabels: false,
      showLegend: false,
      title: 'Over 9K',
      showYAxis: false,
      showXAxis: false,
      color: ['rgb(0, 150, 136)', 'rgb(204, 203, 203)', 'rgb(149, 149, 149)', 'rgb(44, 44, 44)'],
      tooltip: {
        contentGenerator: d => ['<div class="custom-tooltip">', d.point.y, '%</div>', '<div class="custom-tooltip">', d.series[0].key, '</div>'].join('')
      },
      showControls: false
    }
  };

  constructor(private performanceService: PerformanceService,
    private log: angular.ILogService,
    private q: angular.IQService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));

    q.all([this.loadData()]);
  }

  public changePeriod() {
    return this.loadData();
  }

  private loadData() {
    return this.performanceService.getPerformanceData(this.performancePeriod).then(performanceData => this.performanceChartData = performanceData);
  }
}
