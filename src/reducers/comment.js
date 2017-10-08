import * as _ from 'lodash';
import {
  ADD_COMMENT_SUCCESS,
  RECEIVE_COMMENTS_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  VOTE_UP_COMMENT_SUCCESS,
  VOTE_DOWN_COMMENT_SUCCESS,
  SORT_COMMENTS,
} from '../actions/comment';
import * as sortOption from '../util/sortOption';

const initialState = {
  sortOptions: [sortOption.voteScore, sortOption.dateTime, sortOption.author],
  selectedSort: {
    by: 'voteScore',
    order: 'desc',
  },
  comments: [],
};

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS_SUCCESS: {
      const { selectedSort: { by, order } } = state;
      return {
        ...state,
        comments: sortComments(action.comments, by, order),
      };
    }
    case ADD_COMMENT_SUCCESS: {
      const { comment: newComment } = action;
      const { comments, selectedSort: { by, order } } = state;
      return {
        ...state,
        comments: sortComments([...comments, newComment], by, order),
      };
    }
    case EDIT_COMMENT_SUCCESS: {
      const { comment: updatedComment } = action;
      const { comments } = state;
      const oldCommentIndex = comments.findIndex(
        c => c.id === updatedComment.id
      );
      return {
        ...state,
        comments: [
          ...comments.slice(0, oldCommentIndex),
          updatedComment,
          ...comments.slice(oldCommentIndex + 1, state.comments.length),
        ],
      };
    }
    case DELETE_COMMENT_SUCCESS: {
      const { comment: deletedComment } = action;
      const { comments } = state;
      return {
        ...state,
        comments: comments.filter(c => c.id !== deletedComment.id),
      };
    }
    case SORT_COMMENTS: {
      const { selectedSort } = state;
      const { by, order } = selectedSort;
      const { sortBy = by, sortOrder = order } = action;
      const { comments } = state;

      return {
        ...state,
        selectedSort: {
          ...selectedSort,
          by: sortBy,
        },
        comments: sortComments(comments, sortBy, sortOrder),
      };
    }
    case VOTE_UP_COMMENT_SUCCESS:
    case VOTE_DOWN_COMMENT_SUCCESS: {
      const { comment: commentWithNewVote } = action;
      const { comments, selectedSort: { by, order } } = state;
      const oldPostIndex = comments.findIndex(
        p => p.id === commentWithNewVote.id
      );
      const updatedPosts = [
        ...comments.slice(0, oldPostIndex),
        commentWithNewVote,
        ...comments.slice(oldPostIndex + 1, comments.length),
      ];

      return {
        ...state,
        comments: sortComments(updatedPosts, by, order),
      };
    }
    default:
      return state;
  }
}

function sortComments(comments: Comment[], sortBy: string, sortOrder: string) {
  return _.orderBy(comments, [sortBy], [sortOrder]);
}

export default commentReducer;
