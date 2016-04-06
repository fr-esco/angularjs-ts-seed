import ngModuleName from './post.module';

import {IPost} from './post.model';

'use strict';

const ngComponentName = 'tsfnPostForm';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    post: '<',
    onCancel: '&',
    onSubmit: '&'
  },
  templateUrl: 'blog/post/post-form.component.html'
})
@at.inject('$log')
export default class PostFormComponent {
  public post: IPost;

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }
}
