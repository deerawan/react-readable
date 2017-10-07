import type { Post } from './definition';

export function postDetail(post: Post) {
  return `/${post.category}/${post.id}`;
}
