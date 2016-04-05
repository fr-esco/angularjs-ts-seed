import ngModuleName from './post.module';

import {IPost} from './post.model';
import PostClient from './post-client.service';

'use strict';

const ngComponentName = 'tsfnPostList';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'blog/post/post-list.component.html'
})
@at.inject('postClient', '$filter', '$log')
export default class PostListComponent implements at.OnActivate {
  public title: string;
  public posts: IPost[];

  public searchText: string;
  private filterText;

  constructor(private postClient: PostClient,
    private filter: angular.IFilterService,
    private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
    this.filterText = filter('filter');
  }

  public $routerOnActivate(next: at.ComponentInstruction) {
    this.title = next.routeData.data['title'];
    return this.postClient.search()
      .then(data => this.posts = data);
  }

  public search() {
    let filter = this.searchText ? { q: this.searchText } : null;
    return this.postClient.search(filter)
      .then(data => this.posts = this.filterText(data, { title: this.searchText }));
  }
}
