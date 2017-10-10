// @flow

import * as axios from 'axios';
import * as uuid from 'uuid';
import type { Post, Category } from './definition';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
  headers: {
    authorization: 'whatever',
  },
});

/* CATEGORY */

export function fetchCategories(): Category[] {
  return api.get(`/categories`).then(response => response.data.categories);
}

/* POST */

export function fetchPosts(): Post[] {
  return api
    .get(`/posts`)
    .then(({ data: posts }) => mergePostsWithCommentCount(posts));
}

export function fetchPostsByCategory(category) {
  return api
    .get(`/${category}/posts`)
    .then(({ data: posts }) => mergePostsWithCommentCount(posts));
}

export function fetchPost(id): Post {
  return api.get(`/posts/${id}`).then(response => {
    const { data: post } = response;

    return fetchCommentsByPost(post.id).then(comments => ({
      ...post,
      commentsCount: comments.length,
    }));
  });
}

export function addPost(post) {
  const { title, body, author, category } = post;
  return api
    .post(`/posts`, {
      id: uuid.v4(),
      timestamp: new Date().getTime(),
      title,
      body,
      author,
      category,
    })
    .then(({ data: newPost }) => mergeSinglePostWithCommentCount(newPost));
}

export function editPost(post) {
  const { id, title, body, category, author } = post;
  return api
    .put(`/posts/${id}`, {
      title,
      body,
      category,
      author,
    })
    .then(response => response.data);
}

export function deletePost(id) {
  return api.delete(`/posts/${id}`).then(response => response.data);
}

export function votePost(id, option) {
  return api
    .post(`/posts/${id}`, { option })
    .then(({ data: post }) => mergeSinglePostWithCommentCount(post));
}

/**
 * Merge single post with single comment count
 *
 * @param {Post} post
 * @returns
 */
function mergeSinglePostWithCommentCount(post: Post) {
  return fetchCommentsByPost(post.id).then(comments => ({
    ...post,
    commentsCount: comments.length,
  }));
}

/**
 * Merge multiple posts with comments count
 *
 * @param {Post[]} posts
 * @returns
 */
function mergePostsWithCommentCount(posts: Post[]) {
  const getCommentsPromises = posts.map(p => fetchCommentsByPost(p.id));
  return Promise.all(getCommentsPromises).then(comments => {
    const postsWithComments = posts.map((post, index) => ({
      ...post,
      commentsCount: comments[index].length,
    }));

    return postsWithComments;
  });
}

/* COMMENTS */

export function fetchCommentsByPost(postId) {
  return api.get(`/posts/${postId}/comments`).then(response => response.data);
}

export function addComment(comment) {
  const { author, body, parentId } = comment;
  return api
    .post('/comments', {
      id: uuid.v4(),
      timestamp: new Date().getTime(),
      author,
      body,
      parentId,
    })
    .then(response => response.data);
}

export function editComment(comment) {
  const { id, body } = comment;
  return api
    .put(`/comments/${id}`, {
      body,
      timestamp: new Date().getTime(),
    })
    .then(response => response.data);
}

export function deleteComment(id) {
  return api.delete(`/comments/${id}`).then(response => response.data);
}

export function voteComment(id, option) {
  return api
    .post(`/comments/${id}`, { option })
    .then(response => response.data);
}
