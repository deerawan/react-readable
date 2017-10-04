import {
  ADD_COMMENT_SUCCESS,
  RECEIVE_COMMENTS_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
} from '../actions/comment';

const initialState = {
  comments: [],
};

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS_SUCCESS: {
      return {
        ...state,
        comments: action.comments,
      };
    }
    case ADD_COMMENT_SUCCESS: {
      const { comment: newComment } = action;
      const { comments } = state;
      return {
        ...state,
        comments: [...comments, newComment],
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
    default:
      return state;
  }
}

export default commentReducer;
