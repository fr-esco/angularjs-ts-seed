import ngModuleName from './widget.module';

import {IUsageData} from './usage.model';
import UsageService from './usage.service';

'use strict';

const ngControllerName = 'UsageController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('usageService', '$log', '$q')
export default class UsageController {

  public ramChartData: Array<IUsageData> = [];
  public storageChartData: Array<IUsageData> = [];

  public chartOptions = {
    chart: {
      type: 'pieChart',
      height: 130,
      donut: true,
      x: d => d.key,
      y: d => d.y,
      valueFormat: (d3.format('.0f')),
      color: ['rgb(0, 150, 136)', '#E75753', 'rgb(235, 235, 235)'],
      showLabels: false,
      showLegend: false,
      title: '83%',
      margin: { top: -10, left: -20, right: -20 }
    }
  };

  constructor(private usageService: UsageService,
    private log: angular.ILogService,
    private q: angular.IQService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));

    q.all([this.loadRamData(), this.loadStorageData()]);
  }

  private loadRamData() {
    return this.usageService.getRamData().then(data => this.ramChartData = data);
  }

  private loadStorageData() {
    return this.usageService.getStorageData().then(data => this.storageChartData = data);
  }
}
