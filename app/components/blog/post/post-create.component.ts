import ngModuleName from './post.module';

import {IPost} from './post.model';
import PostClient from './post-client.service';

'use strict';

const ngComponentName = 'tsfnPostCreate';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    $router: '<'
  },
  templateUrl: 'blog/post/post-create.component.html'
})
@at.inject('postClient', '$log', '$mdDialog')
export default class PostCreateComponent implements angular.OnActivate, angular.CanDeactivate {
  public $router: angular.Router;

  public title: string;
  public post: IPost;

  private complete = false;

  constructor(private postClient: PostClient,
    private log: angular.ILogService,
    private mdDialog: angular.material.IDialogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $routerOnActivate(next: angular.ComponentInstruction) {
    this.title = next.routeData.data['title'];
  }

  public $routerCanDeactivate() {
    let confirm = this.mdDialog.confirm()
      .ariaLabel('Leave Page Confirmation')
      .ok('ok')
      .cancel('cancel')
      .title(['Leave Page?'].join(''))
      .textContent(['Are you sure?', 'All changes will be lost.'].join(' '));
    return this.complete || this.mdDialog.show(confirm)
      .then(() => true, () => false)
      .finally(() => confirm = undefined);
  }

  public cancel() {
    return this.$router.navigate(['PostList']);
  }

  public confirm(post: IPost) {
    return this.postClient.create(post)
      .then(post => this.post = post, this.log.error)
      .then(this.log.debug)
      .then(() => this.complete = true, () => this.complete = false)
      .then(() => this.$router.navigate(['PostDetail', { id: this.post.id }]));
  }

}
