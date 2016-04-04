import ngModuleName from './post.module';

import {IPost} from './post.model';
import PostClient from './post-client.service';

'use strict';

const ngComponentName = 'tsfnPostList';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'blog/post/post-list.component.html'
})
@at.inject('postClient', '$log')
export default class PostListComponent implements at.OnInit, at.OnActivate {
  public title: string;
  public posts: IPost[];

  constructor(private postClient: PostClient,
    private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $onInit() {
    this.postClient.search()
      .then(data => this.posts = data);
  }

  public $routerOnActivate(next: at.ComponentInstruction) {
    this.title = next.routeData.data['title'];
  }
}
