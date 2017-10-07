import * as axios from 'axios';
import * as uuid from 'uuid';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  headers: {
    authorization: 'whatever',
  },
});

export function fetchPosts() {
  return api.get(`/posts`).then(response => response.data);
}

export function fetchPost(id) {
  return api.get(`/posts/${id}`).then(response => response.data);
}

export function fetchCategories() {
  return api.get(`/categories`).then(response => response.data.categories);
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
    .then(response => response.data);
}

export function editPost(post) {
  const { id, title, body } = post;
  return api
    .put(`/posts/${id}`, {
      title,
      body,
    })
    .then(response => response.data);
}

export function deletePost(id) {
  return api.delete(`/posts/${id}`).then(response => response.data);
}

export function votePost(id, option) {
  return api.post(`/posts/${id}`, { option }).then(response => response.data);
}

export function fetchPostsByCategory(category) {
  return api.get(`/${category}/posts`).then(response => response.data);
}

/** COMMENTS */

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
