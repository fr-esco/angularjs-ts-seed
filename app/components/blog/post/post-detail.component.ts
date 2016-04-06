import ngModuleName from './post.module';

import {IPost} from './post.model';
import PostClient from './post-client.service';

'use strict';

const ngComponentName = 'tsfnPostDetail';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'blog/post/post-detail.component.html'
})
@at.inject('postClient', '$filter', '$log')
export default class PostDetailComponent implements angular.OnActivate {
  public post: IPost;
  private markdown;

  constructor(private postClient: PostClient,
    private filter: angular.IFilterService,
    private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
    this.markdown = filter('markdown');
  }

  public $routerOnActivate(next: at.ComponentInstruction) {
    return this.postClient.read(next.params['id'])
      .then(data => (data.content = this.markdown(data.content)) && data)
      .then(data => this.post = data);
  }
}
