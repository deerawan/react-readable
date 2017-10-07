import type { Post, Category } from './definition';

export function postDetail(post: Post) {
  return `/${post.category}/${post.id}`;
}

export function categoryPost(category: Category) {
  return `/${category.name}`;
}
