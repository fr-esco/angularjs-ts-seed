import ngModuleName from './post.module';

'use strict';

const ngComponentName = 'tsfnPostList';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    myAttribute: '@',
    myOneWayBinding: '<'
  },
  templateUrl: 'blog/post/post-list.component.html'
})
@at.inject('$log')
export default class PostListComponent {
  public test = true;

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }
}
