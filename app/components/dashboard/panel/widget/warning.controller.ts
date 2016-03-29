import ngModuleName from './widget.module';

'use strict';

const ngControllerName = 'WarningController';

interface IPoint {
  x: number;
  y: number;
}

@at.controller(ngModuleName, ngControllerName)
@at.inject('$log', '$q')
export default class WarningController {

  public warningChartData: () => Array<{ values: IPoint[], color: string, area: boolean }>;

  public chartOptions = {
    chart: {
      type: 'lineChart',
      height: 210,
      margin: { top: -10, left: -20, right: -20 },
      x: d => d.x,
      y: d => d.y,
      showLabels: false,
      showLegend: false,
      title: 'Over 9K',
      showYAxis: false,
      showXAxis: false,
      tooltip: { contentGenerator: d => ['<span class="custom-tooltip">', Math.round(d.point.y), '</span>'].join('') }
    }
  };

  constructor(private log: angular.ILogService,
    private q: angular.IQService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));

    q.all([this.loadWarningData()]);
  }

  private loadWarningData() {
    return this.q.when(() => {
      let sin = [];
      for (let i = 0; i < 100; i++) {
        sin.push({ x: i, y: Math.abs(Math.cos(i / 10) * 0.25 * i + 0.9 - 0.4 * i) });
      }
      return [{ values: sin, color: 'rgb(0, 150, 136)', area: true }];
    }).then(generator => this.warningChartData = generator);
  }

}
