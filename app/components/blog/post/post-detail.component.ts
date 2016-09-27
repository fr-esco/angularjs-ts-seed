import ngModuleName from './post.module'

import {IPost} from './post.model'
import PostClient from './post-client.service'

'use strict'

const ngComponentName = 'tsngPostDetail'

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'components/blog/post/post-detail.component.html'
})
export default class PostDetailComponent implements angular.OnActivate {
  public post: IPost
  private markdown

  constructor(private postClient: PostClient,
    private $filter: angular.IFilterService,
    private $log: angular.ILogService) {
    'ngInject'
    $log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '))
    this.markdown = $filter('markdown')
  }

  public $routerOnActivate(next: angular.ComponentInstruction) {
    return this.postClient.read(next.params['id'])
      .then(data => (data.content = this.markdown(data.content)) && data)
      .then(data => this.post = data)
  }
}
