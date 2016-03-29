import ngModuleName from './widget.module';

import {IVisitor} from './visitor.model';
import VisitorService from './visitor.service';

'use strict';

const ngControllerName = 'VisitorController';

@at.controller(ngModuleName, ngControllerName)
@at.inject('visitorService', '$log', '$q')
export default class VisitorController {

  public visitorChartData: Array<IVisitor> = [];

  public chartOptions = {
    chart: {
      type: 'pieChart',
      height: 210,
      donut: true,
      x: d => d.key,
      y: d => d.y,
      valueFormat: (d3.format('.0f')),
      color: ['rgb(0, 150, 136)', '#E75753'],
      showLabels: false,
      showLegend: false,
      title: 'Over 9K',
      margin: { top: -10 }
    }
  };

  constructor(private visitorService: VisitorService,
    private log: angular.ILogService,
    private q: angular.IQService) {
    log.debug(['ngController', ngControllerName, 'loaded'].join(' '));

    q.all([this.loadVisitorData()]);
  }

  private loadVisitorData() {
    return this.visitorService.getVisitorData().then(data => this.visitorChartData = data);
  }

}
