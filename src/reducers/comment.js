import * as _ from 'lodash';
import {
  ADD_COMMENT_SUCCESS,
  RECEIVE_COMMENTS_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  VOTE_UP_COMMENT_REQUEST,
  VOTE_DOWN_COMMENT_REQUEST,
  SORT_COMMENTS,
} from '../actions/comment';
import * as sortOption from '../util/sortOption';
import { SORT_ORDER, VOTE_TYPE } from '../constant';

const initialState = {
  sortOptions: [sortOption.voteScore, sortOption.dateTime, sortOption.author],
  selectedSort: {
    by: 'voteScore',
    order: SORT_ORDER.desc,
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
    case VOTE_UP_COMMENT_REQUEST: {
      return voteComment(state, action, VOTE_TYPE.upVote);
    }
    case VOTE_DOWN_COMMENT_REQUEST: {
      return voteComment(state, action, VOTE_TYPE.downVote);
    }
    default:
      return state;
  }
}

function voteComment(state, action, voteType: string) {
  const { id } = action;
  const { comments, selectedSort: { by, order } } = state;
  const votedCommentIndex = comments.findIndex(p => p.id === id);
  if (votedCommentIndex < 0) {
    return state;
  }

  const votedComment = comments[votedCommentIndex];
  const updatedVotedComment = {
    ...votedComment,
    voteScore:
      voteType === VOTE_TYPE.upVote
        ? votedComment.voteScore + 1
        : votedComment.voteScore - 1,
  };
  const updatedComments = [
    ...comments.slice(0, votedCommentIndex),
    updatedVotedComment,
    ...comments.slice(votedCommentIndex + 1, comments.length),
  ];

  return {
    ...state,
    comments: sortComments(updatedComments, by, order),
  };
}

function sortComments(comments: Comment[], sortBy: string, sortOrder: string) {
  return _.orderBy(comments, [sortBy], [sortOrder]);
}

export default commentReducer;
