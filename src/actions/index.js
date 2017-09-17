import * as api from '../util/api';

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILED = 'ADD_POST_FAILED';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SORT_POST = 'SORT_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';

export function addPostSuccess(post) {
  return {
    type: ADD_POST_SUCCESS,
    post,
  };
}

export function addPostFailed() {
  return {
    type: ADD_POST_FAILED,
  };
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  };
}

export function sortPost(sortBy, sortOrder = 'asc') {
  return {
    type: SORT_POST,
    sortBy,
  };
}

export function deletePostSuccess(id) {
  return {
    type: DELETE_POST_SUCCESS,
    id,
  };
}

export function fetchPosts() {
  return dispatch =>
    api.fetchPosts().then(response => {
      dispatch(receivePosts(response));
    });
}

export function addPost(post) {
  return dispatch =>
    api
      .addPost(post)
      .then(response => dispatch(addPostSuccess(post)))
      .catch(error => dispatch(addPostFailed()));
}

export function deletePost(id) {
  return dispatch => api.deletePost(id).then(response => dispatch(deletePostSuccess(id)));
}
