import ngModuleName from './post.module';

import {IPost} from './post.model';
import PostClient from './post-client.service';

'use strict';

const ngComponentName = 'tsfnPostList';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    $router: '<'
  },
  templateUrl: 'blog/post/post-list.component.html'
})
@at.inject('postClient', '$filter', '$log', '$mdDialog', 'amMoment')
export default class PostListComponent implements angular.OnActivate {
  public $router: angular.Router;

  public title: string;
  public posts: IPost[];

  public searchText: string;
  private filterText;

  constructor(private postClient: PostClient,
    private filter: angular.IFilterService,
    private log: angular.ILogService,
    private mdDialog: angular.material.IDialogService,
    private amMoment: any) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
    this.filterText = filter('filter');
  }

  public $routerOnActivate(next: angular.ComponentInstruction) {
    this.title = next.routeData.data['title'];
    return this.postClient.search()
      .then(data => this.posts = data, () => false);
  }

  public search() {
    let filter = this.searchText ? { q: this.searchText } : null;
    return this.postClient.search(filter)
      .then(data => this.posts = this.filterText(data, { title: this.searchText }));
  }

  public update($event: PointerEvent, post: IPost) {
    return this.$router.navigate(['PostUpdate', { id: post.id }]);
  }

  public delete($event: PointerEvent, post: IPost) {
    let confirm = this.mdDialog.confirm()
      .targetEvent($event)
      .ariaLabel('Delete Confirmation')
      .ok('ok')
      .cancel('cancel')
      .title(['Delete ', post.id, '?'].join(''))
      .textContent(['Delete ', post.id, '?'].join(''));
    this.mdDialog.show(confirm)
      .then(() => this.postClient.delete(post))
      .then(() => this.posts.indexOf(post))
      .then(index => this.posts.splice(index, 1))
      .finally(() => confirm = undefined);
  }
}
