import ngModuleName from './post.module';

import {IComment} from '../comment/comment.model';
import {IPost} from './post.model';
import PostClient from './post-client.service';

'use strict';

const ngComponentName = 'tsngPostComments';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    post: '<',
    title: '@sectionTitle'
  },
  templateUrl: 'blog/post/post-comments.component.html'
})
@at.inject('postClient', '$log', '$mdDialog')
export default class PostCommentsComponent implements at.OnInit, at.OnChanges {
  public title: string;
  public post: IPost;
  public comments: IComment[];

  constructor(private postClient: PostClient,
    private log: angular.ILogService,
    private mdDialog: angular.material.IDialogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $onInit() {
    return this.post && this.postClient.comments(this.post)
      .then(data => this.comments = data);
  }

  public $onChanges(changes: { post?: at.IChange<IPost> }) {
    if (changes.post) {
      if (changes.post.currentValue)
        this.postClient.comments(changes.post.currentValue)
          .then(data => this.comments = data);
      else
        this.comments = [];
    }
  }

  public view($event: PointerEvent, commentId: number) {
    let alert: angular.material.IAlertDialog;
    this.postClient.comment(this.post, commentId)
      .then(comment =>
        alert = this.mdDialog.alert()
          .targetEvent($event)
          .ok('ok')
          .title(commentId + '')
          .htmlContent(comment.content))
      .then(() => this.mdDialog.show(alert))
      .finally(() => alert = undefined);
  }

  public delete($event: PointerEvent, comment: IComment) {
    let confirm = this.mdDialog.confirm()
      .targetEvent($event)
      .ariaLabel('Delete Confirmation')
      .ok('ok')
      .cancel('cancel')
      .title(['Delete ', comment.id, '?'].join(''))
      .textContent(['Delete ', comment.id, '?'].join(''));
    this.mdDialog.show(confirm)
      .then(() => this.postClient.commentDelete(this.post, comment))
      .then(() => this.comments.indexOf(comment))
      .then(index => this.comments.splice(index, 1))
      .finally(() => confirm = undefined);
  }
}
