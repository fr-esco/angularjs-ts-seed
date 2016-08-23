import ngModuleName from './post.module';

import {IPost} from './post.model';

'use strict';

interface IPostForm extends IPost {
  createdAtDate(newDate: Date): Date;
}

const ngComponentName = 'tsngPostForm';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    post: '<',
    onCancel: '&',
    onSubmit: '&'
  },
  templateUrl: 'components/blog/post/post-form.component.html'
})
@at.inject('$log')
export default class PostFormComponent {
  public post: IPost;

  private postCreatedAtDate: Date;
  private get postCreatedAt() { return this.postCreatedAtDate || (this.postCreatedAtDate = new Date(this.post.createdAt)); }
  private get postId() { return this.post.id; }

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }
}
