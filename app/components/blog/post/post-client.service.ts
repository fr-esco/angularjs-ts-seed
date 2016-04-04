import ngModuleName from './post.module';

import {IPost} from './post.model';
import {IComment} from '../comment/comment.model';
import CommentClient from '../comment/comment-client.service';

'use strict';

const ngServiceName = 'postClient';

@at.service(ngModuleName, ngServiceName)
@at.inject('commentClient', '$log', '$q', 'Restangular')
export default class PostClientService {
  public get baseUrl() { return 'posts'; }
  public get baseList() { return this.restangular.all(this.baseUrl); }

  public baseElement(id: number) { return this.restangular.one(this.baseUrl, id); }

  constructor(private commentClient: CommentClient,
    private log: angular.ILogService,
    private q: angular.IQService,
    private restangular: restangular.IService) {
    log.debug(['ngService', ngServiceName, 'loaded'].join(' '));
  }

  public search(params?) {
    return this.baseList.getList<IPost>(params);
  }

  public read(id: number) {
    return this.baseList.get<IPost>(id);
  }

  public comments(post: IPost, params?);
  public comments(post: number, params?);
  public comments(post, params?) {
    let postId = typeof post === 'number' ? post : post.id;
    return this.baseElement(postId).getList<IComment>(this.commentClient.baseUrl, params);
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

}
