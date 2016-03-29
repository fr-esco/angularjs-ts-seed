import ngModuleName from './<%= modName %>.module';

'use strict';

const ngFilterName = '<%= name %>';

@at.filter(ngModuleName, ngFilterName)
@at.inject('$log')
export default class <%= upCaseName %>Filter implements at.IFilter {

  constructor(private log: angular.ILogService) {
    log.debug(['ngFilter', ngFilterName, 'loaded'].join(' '));
  }

  public transform = (input: string | Array<any>): number => !input ? 0 : input.length;

}
