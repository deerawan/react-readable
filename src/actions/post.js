import { push } from 'react-router-redux';
import * as api from '../util/api';
import * as link from '../util/link';
import { VOTE_TYPE } from '../constant';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILED = 'ADD_POST_FAILED';
export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILED = 'FETCH_POST_FAILED';
export const FETCH_POSTS_BY_CATEGORY_REQUEST =
  'FETCH_POSTS_BY_CATEGORY_REQUEST';
export const FETCH_POSTS_BY_CATEGORY_SUCCESS =
  'FETCH_POSTS_BY_CATEGORY_SUCCESS';
export const SORT_POST = 'SORT_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const VOTE_UP_POST_REQUEST = 'VOTE_UP_POST_REQUEST';
export const VOTE_UP_POST_SUCCESS = 'VOTE_UP_POST_SUCCESS';
export const VOTE_DOWN_POST_REQUEST = 'VOTE_DOWN_POST_REQUEST';
export const VOTE_DOWN_POST_SUCCESS = 'VOTE_DOWN_POST_SUCCESS';

export function addPostRequest() {
  return {
    type: ADD_POST_REQUEST,
  };
}

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

export function editPostRequest() {
  return {
    type: EDIT_POST_REQUEST,
  };
}

export function editPostSuccess(post) {
  return {
    type: EDIT_POST_SUCCESS,
    post,
  };
}

export function fetchPostsRequest() {
  return {
    type: FETCH_POSTS_REQUEST,
  };
}

export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts,
  };
}

export function fetchPostRequest() {
  return {
    type: FETCH_POST_REQUEST,
  };
}

export function fetchPostSuccess(post) {
  return {
    type: FETCH_POST_SUCCESS,
    post,
  };
}

export function fetchPostFailed() {
  return {
    type: FETCH_POST_FAILED,
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

export function voteUpPostRequest(id) {
  return {
    type: VOTE_UP_POST_REQUEST,
    id,
  };
}

export function voteUpPostSuccess(post) {
  return {
    type: VOTE_UP_POST_SUCCESS,
    post,
  };
}

export function voteDownPostRequest(id) {
  return {
    type: VOTE_DOWN_POST_REQUEST,
    id,
  };
}

export function voteDownPostSuccess(post) {
  return {
    type: VOTE_DOWN_POST_SUCCESS,
    post,
  };
}

export function fetchPostByCategoryRequest() {
  return {
    type: FETCH_POSTS_BY_CATEGORY_REQUEST,
  };
}

export function fetchPostsByCategorySuccess(posts) {
  return {
    type: FETCH_POSTS_BY_CATEGORY_SUCCESS,
    posts,
  };
}

export function fetchPosts() {
  return dispatch => {
    dispatch(fetchPostsRequest());
    return api.fetchPosts().then(response => {
      dispatch(fetchPostsSuccess(response));
    });
  };
}

export function fetchPost(id) {
  return dispatch => {
    dispatch(fetchPostRequest());
    return api
      .fetchPost(id)
      .then(post => dispatch(fetchPostSuccess(post)))
      .catch(() => dispatch(fetchPostFailed()));
  };
}

export function fetchPostsByCategory(category) {
  return dispatch => {
    dispatch(fetchPostByCategoryRequest());
    return api
      .fetchPostsByCategory(category)
      .then(posts => dispatch(fetchPostsByCategorySuccess(posts)));
  };
}

export function addPost(post) {
  return dispatch => {
    dispatch(addPostRequest());
    return api
      .addPost(post)
      .then(newPost => {
        dispatch(addPostSuccess(newPost));
        dispatch(push(link.postDetail(newPost)));
      })
      .catch(error => dispatch(addPostFailed()));
  };
}

export function editPost(post) {
  return dispatch => {
    dispatch(editPostRequest());
    return api.editPost(post).then(updatedPost => {
      dispatch(editPostSuccess(updatedPost));
      dispatch(push(link.postDetail(updatedPost)));
    });
  };
}

export function deletePost(id) {
  return dispatch =>
    api.deletePost(id).then(post => dispatch(deletePostSuccess(post)));
}

export function voteUpPost(id) {
  return dispatch => {
    dispatch(voteUpPostRequest(id));
    return api
      .votePost(id, VOTE_TYPE.upVote)
      .then(post => dispatch(voteUpPostSuccess(post)));
  };
}

export function voteDownPost(id) {
  return dispatch => {
    dispatch(voteDownPostRequest(id));
    return api
      .votePost(id, VOTE_TYPE.downVote)
      .then(post => dispatch(voteDownPostSuccess(post)));
  };
}
