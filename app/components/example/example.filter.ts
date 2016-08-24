import ngModuleName from './example.module';

'use strict';

const ngFilterName = 'example';

@at.filter(ngModuleName, ngFilterName)
export default class ExampleFilter implements at.IFilter {

  constructor(private $log: angular.ILogService) {
    'ngInject';
    $log.debug(['ngFilter', ngFilterName, 'loaded'].join(' '));
  }

  public transform = (input: string | Array<any>): number => !input ? 0 : input.length;

}
