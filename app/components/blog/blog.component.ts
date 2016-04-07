import ngModuleName from './blog.module';

'use strict';

const ngComponentName = 'tsfnBlog';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'blog/blog.component.html',
  $routeConfig: [
    { path: '/posts', name: 'PostList', component: 'tsfnPostList', useAsDefault: true, data: { title: 'Posts' } },
    { path: '/posts/create', name: 'PostCreate', component: 'tsfnPostCreate', data: { title: 'New Post' } },
    { path: '/posts/update/:id', name: 'PostUpdate', component: 'tsfnPostUpdate' },
    { path: '/posts/:id', name: 'PostDetail', component: 'tsfnPostDetail' },
  ]
})
@at.inject('$log')
export default class BlogComponent implements angular.OnActivate {
  public title: string;

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $routerOnActivate(next: angular.ComponentInstruction) {
    this.title = next.routeData.data['title'];
  }
}
