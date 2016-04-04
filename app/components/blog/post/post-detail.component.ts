import ngModuleName from './post.module';

'use strict';

const ngComponentName = 'tsfnPostDetail';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'blog/post/post-detail.component.html'
})
@at.inject('$log')
export default class PostDetailComponent implements at.OnActivate {
  public title: string;

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $routerOnActivate(next: at.ComponentInstruction) {
    // this.title = next.routeData.data['title'];
  }
}
