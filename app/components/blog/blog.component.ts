import ngModuleName from './blog.module';

'use strict';

const ngComponentName = 'tsngBlog';

@at.component(ngModuleName, ngComponentName, {
  templateUrl: 'components/blog/blog.component.html',
  $routeConfig: [
    { path: '/posts', name: 'PostList', component: 'tsngPostList', useAsDefault: true, data: { title: 'Posts' } },
    { path: '/posts/create', name: 'PostCreate', component: 'tsngPostCreate', data: { title: 'New Post' } },
    { path: '/posts/update/:id', name: 'PostUpdate', component: 'tsngPostUpdate' },
    { path: '/posts/:id', name: 'PostDetail', component: 'tsngPostDetail' },
  ]
})
@at.inject('$log')
export default class BlogComponent implements angular.OnActivate {
  public title: string;

  private files = [
    [
      'components/blog/blog.scss',
      'components/blog/blog.module.ts',
      'components/blog/blog.component.html',
      'components/blog/blog.component.ts',
    ], [
      'components/blog/post/post.scss',
      'components/blog/post/post.module.ts',
      'components/blog/post/post.model.ts',
      'components/blog/post/post-list.component.html',
      'components/blog/post/post-list.component.ts',
      'components/blog/post/post-detail.component.html',
      'components/blog/post/post-detail.component.ts',
      'components/blog/post/post-comments.component.html',
      'components/blog/post/post-comments.component.ts',
      'components/blog/post/post-create.component.html',
      'components/blog/post/post-create.component.ts',
      'components/blog/post/post-update.component.html',
      'components/blog/post/post-update.component.ts',
      'components/blog/post/post-form.component.html',
      'components/blog/post/post-form.component.ts',
    ], [
      'components/blog/post/post-client.service.ts',
      'components/blog/comment/comment-client.service.ts',
      'components/rest/rest.config.ts',
      'components/rest/rest.model.ts',
      'components/rest/rest.module.ts',
    ]
  ];

  constructor(private log: angular.ILogService) {
    log.debug(['ngComponent', ngComponentName, 'loaded'].join(' '));
  }

  public $routerOnActivate(next: angular.ComponentInstruction) {
    this.title = next.routeData.data['title'];
  }
}
