import ngModuleName from './post.module';

import {BaseRestClient} from '../../rest/rest.model';

import {IPost} from './post.model';
import {IComment} from '../comment/comment.model';
import CommentClient from '../comment/comment-client.service';

'use strict';

const ngServiceName = 'postClient';

@at.service(ngModuleName, ngServiceName)
@at.inject('commentClient', '$log', '$q', 'Restangular')
@at.failSafe(ngModuleName, ngServiceName)
export default class PostClientService extends BaseRestClient<IPost> {
  public get baseUrl() { return 'posts'; }

  constructor(private commentClient: CommentClient,
    private log: angular.ILogService,
    private q: angular.IQService,
    protected restangular: restangular.IService) {
    super(restangular);
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public comments(post: IPost, params?);
  public comments(post: number, params?);
  @at.action('get the comment list')
  public comments(post, params?) {
    let postId = typeof post === 'number' ? post : post.id;
    throw new Error('ERRORE');
    // return this.baseElement(postId).getList<IComment>(this.commentClient.baseUrl, params);
  }

  public comment(post: IPost, comment: IComment);
  public comment(post: number, comment: IComment);
  public comment(post: IPost, comment: number);
  public comment(post: number, comment: number);
  public comment(post, comment) {
    let postId = typeof post === 'number' ? post : post.id;
    let commentId = typeof comment === 'number' ? comment : comment.id;
    return this.baseElement(postId).one(this.commentClient.baseUrl, commentId).get<IComment>();
  }

  public commentDelete(post: IPost, comment: IComment);
  public commentDelete(post: number, comment: IComment);
  public commentDelete(post: IPost, comment: number);
  public commentDelete(post: number, comment: number);
  public commentDelete(post, comment) {
    let postId = typeof post === 'number' ? post : post.id;
    let commentId = typeof comment === 'number' ? comment : comment.id;
    return this.baseElement(postId).one(this.commentClient.baseUrl, commentId).remove();
  }

}
