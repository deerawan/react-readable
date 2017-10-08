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

export type Comment = {
  id: string,
  body: string,
  author: string,
  timestamp: number,
  parentId: number,
};

export type SortList = {
  by: string,
  order: string,
};

export type SortOption = {
  name: string,
  value: string,
};
