import * as api from '../util/api';
import { VOTE_TYPE } from '../constant';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const RECEIVE_COMMENTS_SUCCESS = 'RECEIVE_COMMENTS_SUCCESS';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const VOTE_UP_COMMENT_REQUEST = 'VOTE_UP_COMMENT_REQUEST';
export const VOTE_UP_COMMENT_SUCCESS = 'VOTE_UP_COMMENT_SUCCESS';
export const VOTE_DOWN_COMMENT_REQUEST = 'VOTE_DOWN_COMMENT_REQUEST';
export const VOTE_DOWN_COMMENT_SUCCESS = 'VOTE_DOWN_COMMENT_SUCCESS';
export const SORT_COMMENTS = 'SORT_COMMENTS';

export function receiveCommentsSuccess(comments) {
  return {
    type: RECEIVE_COMMENTS_SUCCESS,
    comments,
  };
}

export function addCommentRequest() {
  return {
    type: ADD_COMMENT_REQUEST,
  };
}

export function addCommentSuccess(comment) {
  return {
    type: ADD_COMMENT_SUCCESS,
    comment,
  };
}

export function editCommentRequest() {
  return {
    type: EDIT_COMMENT_REQUEST,
  };
}

export function editCommentSuccess(comment) {
  return {
    type: EDIT_COMMENT_SUCCESS,
    comment,
  };
}

export function deleteCommentSuccess(comment) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    comment,
  };
}

export function voteUpCommentRequest(id) {
  return {
    type: VOTE_UP_COMMENT_REQUEST,
    id,
  };
}

export function voteUpCommentSuccess(comment) {
  return {
    type: VOTE_UP_COMMENT_SUCCESS,
    comment,
  };
}

export function voteDownCommentRequest(id) {
  return {
    type: VOTE_DOWN_COMMENT_REQUEST,
    id,
  };
}

export function voteDownCommentSuccess(comment) {
  return {
    type: VOTE_DOWN_COMMENT_SUCCESS,
    comment,
  };
}

export function sortComments(sortBy, sortOrder = 'asc') {
  return {
    type: SORT_COMMENTS,
    sortBy,
    sortOrder,
  };
}

export function fetchCommentsByPost(postId) {
  return dispatch =>
    api
      .fetchCommentsByPost(postId)
      .then(comments => dispatch(receiveCommentsSuccess(comments)));
}

export function addComment(newComment) {
  return dispatch => {
    dispatch(addCommentRequest());
    return api
      .addComment(newComment)
      .then(comment => dispatch(addCommentSuccess(comment)));
  };
}

export function editComment(updatedComment) {
  return dispatch => {
    dispatch(editCommentRequest());
    return api
      .editComment(updatedComment)
      .then(comment => dispatch(editCommentSuccess(comment)));
  };
}

export function deleteComment(commentId) {
  return dispatch => {
    api
      .deleteComment(commentId)
      .then(comment => dispatch(deleteCommentSuccess(comment)));
  };
}

export function voteUpComment(id) {
  return dispatch => {
    dispatch(voteUpCommentRequest(id));
    return api
      .voteComment(id, VOTE_TYPE.upVote)
      .then(post => dispatch(voteUpCommentSuccess(post)));
  };
}

export function voteDownComment(id) {
  return dispatch => {
    dispatch(voteDownCommentRequest(id));
    return api
      .voteComment(id, VOTE_TYPE.downVote)
      .then(post => dispatch(voteDownCommentSuccess(post)));
  };
}
