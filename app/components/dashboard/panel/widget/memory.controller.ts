import ngModuleName from './widget.module';

'use strict';

const ngControllerName = 'MemoryController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('$log')
export default class MemoryController {
  public memoryChartData = [{ key: 'memory', y: 42 }, { key: 'free', y: 58 }];

  public chartOptions = {
    chart: {
      type: 'pieChart',
      height: 210,
      donut: true,
      pie: {
        startAngle: d => (d.startAngle / 2 - Math.PI / 2),
        endAngle: d => (d.endAngle / 2 - Math.PI / 2)
      },
      x: d => d.key,
      y: d => d.y,
      valueFormat: (d3.format('.0f')),
      color: ['rgb(0, 150, 136)', 'rgb(191, 191, 191)'],
      showLabels: false,
      showLegend: false,
      tooltips: false,
      title: '42%',
      titleOffset: -10,
      margin: { bottom: -80, left: -20, right: -20 }
    }
  };

  constructor(private log: angular.ILogService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));
  }
}
