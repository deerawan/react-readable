import { push } from 'react-router-redux';
import * as api from '../util/api';
import * as link from '../util/link';

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILED = 'ADD_POST_FAILED';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST_SUCCESS = 'RECEIVE_POST_SUCCESS';
export const RECEIVE_POSTS_BY_CATEGORY_SUCCESS =
  'RECEIVE_POSTS_BY_CATEGORY_SUCCESS';
export const SORT_POST = 'SORT_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const VOTE_UP_POST_SUCCESS = 'VOTE_UP_POST_SUCCESS';
export const VOTE_DOWN_POST_SUCCESS = 'VOTE_DOWN_POST_SUCCESS';

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

export function editPostSuccess(post) {
  return {
    type: EDIT_POST_SUCCESS,
    post,
  };
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  };
}

export function receivePostSuccess(post) {
  return {
    type: RECEIVE_POST_SUCCESS,
    post,
  };
}

export function sortPost(sortBy, sortOrder = 'asc') {
  return {
    type: SORT_POST,
    sortBy,
    sortOrder,
  };
}

export function deletePostSuccess(post) {
  return {
    type: DELETE_POST_SUCCESS,
    post,
  };
}

export function voteUpPostSuccess(post) {
  return {
    type: VOTE_UP_POST_SUCCESS,
    post,
  };
}

export function voteDownPostSuccess(post) {
  return {
    type: VOTE_DOWN_POST_SUCCESS,
    post,
  };
}

export function receivePostsByCategorySuccess(posts) {
  return {
    type: RECEIVE_POSTS_BY_CATEGORY_SUCCESS,
    posts,
  };
}

export function fetchPosts() {
  return dispatch =>
    api.fetchPosts().then(response => {
      dispatch(receivePosts(response));
    });
}

export function fetchPost(id) {
  return dispatch =>
    api.fetchPost(id).then(post => dispatch(receivePostSuccess(post)));
}

export function fetchPostsByCategory(category) {
  return dispatch =>
    api
      .fetchPostsByCategory(category)
      .then(posts => dispatch(receivePostsByCategorySuccess(posts)));
}

export function addPost(post) {
  return dispatch =>
    api
      .addPost(post)
      .then(newPost => {
        dispatch(addPostSuccess(newPost));
        dispatch(push(link.postDetail(newPost)));
      })
      .catch(error => dispatch(addPostFailed()));
}

export function editPost(post) {
  return dispatch =>
    api.editPost(post).then(updatedPost => {
      dispatch(editPostSuccess(updatedPost));
      dispatch(push(link.postDetail(updatedPost)));
    });
}

export function deletePost(id) {
  return dispatch =>
    api.deletePost(id).then(post => dispatch(deletePostSuccess(post)));
}

export function voteUpPost(id) {
  return dispatch =>
    api.votePost(id, 'upVote').then(post => dispatch(voteUpPostSuccess(post)));
}

export function voteDownPost(id) {
  return dispatch =>
    api
      .votePost(id, 'downVote')
      .then(post => dispatch(voteDownPostSuccess(post)));
}
