// @flow

export type Post = {
  id: string,
  title: string,
  body: string,
  timestamp: number,
  author: string,
  category: string,
  commentsCount: number,
};

export type Category = {
  name: string,
  path: string,
};
