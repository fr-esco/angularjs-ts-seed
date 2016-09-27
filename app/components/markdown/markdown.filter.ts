import ngModuleName from './markdown.module'

'use strict'

const ngFilterName = 'markdown'

@at.filter(ngModuleName, ngFilterName)
export default class MarkdownFilter implements at.IFilter {

  constructor(private $log: angular.ILogService, private $showdown) {
    'ngInject'
    $log.debug(['ngFilter', ngFilterName, 'loaded'].join(' '))
  }

  public transform = (input: string): string =>
    !input ? '' : this.$showdown.makeHtml(input)

}
