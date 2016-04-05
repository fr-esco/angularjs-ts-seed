import ngModuleName from './comment.module';

import {IComment} from './comment.model';
import CommentClient from './comment-client.service';

'use strict';

const ngComponentName = 'tsfnCommentList';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    post: '<?'
  },
  templateUrl: 'blog/comment/comment-list.component.html'
})
@at.inject('commentClient', '$log')
export default class CommentListComponent implements at.OnInit {
  public post;

  constructor(private commentClient: CommentClient,
    private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $onInit() {

  }
}
