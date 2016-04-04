'use strict';

export interface IComment {
  id: number;
  createdAt: Date;
  postId: number;
  content: string;
}
