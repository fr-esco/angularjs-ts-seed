import ngModuleName from './post.module';

'use strict';

const ngComponentName = 'tsfnPostDetail';

@at.component(ngModuleName, ngComponentName, {
  bindings: {
    myAttribute: '@',
    myOneWayBinding: '<'
  },
  templateUrl: 'blog/post/post-detail.component.html'
})
@at.inject('$log')
export default class PostDetailComponent {
  public test = true;

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }
}
