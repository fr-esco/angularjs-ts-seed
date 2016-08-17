import ngModuleName from './markdown.module';

'use strict';

const ngFilterName = 'markdown';

@at.filter(ngModuleName, ngFilterName)
@at.inject('$log', '$showdown')
export default class MarkdownFilter implements at.IFilter {

  constructor(private log: angular.ILogService, private showdown) {
    log.debug(['ngFilter', ngFilterName, 'loaded'].join(' '));
  }

  public transform = (input: string): string =>
    !input ? '' : this.showdown.makeHtml(input);

}
