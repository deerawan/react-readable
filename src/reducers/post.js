import * as _ from 'lodash';
import {
  ADD_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  EDIT_POST_SUCCESS,
  RECEIVE_POSTS,
  RECEIVE_POST_SUCCESS,
  VOTE_UP_POST_SUCCESS,
  VOTE_DOWN_POST_SUCCESS,
  SORT_POST,
  RECEIVE_POSTS_BY_CATEGORY_SUCCESS,
} from '../actions';

const initialState = {
  posts: [],
  selectedSort: {
    by: 'voteScore',
    order: 'desc',
  },
  selectedPost: {
    id: '',
    title: '',
    body: '',
    author: '',
    category: '',
  },
};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        posts: state.posts.concat(action.post),
      };
    }
    case EDIT_POST_SUCCESS: {
      const { post: editedPost } = action;
      const oldPostIndex = state.posts.findIndex(post => post.id === editedPost.id);
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, oldPostIndex),
          editedPost,
          ...state.posts.slice(oldPostIndex + 1, state.posts.length),
        ],
      };
    }
    case DELETE_POST_SUCCESS: {
      const { post: deletedPost } = action;
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== deletedPost.id),
      };
    }
    case RECEIVE_POSTS: {
      return {
        ...state,
        posts: action.posts,
      };
    }
    case RECEIVE_POST_SUCCESS: {
      return {
        ...state,
        selectedPost: action.post,
      };
    }
    case RECEIVE_POSTS_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        posts: action.posts,
      };
    }
    case SORT_POST: {
      const { sortBy, sortOrder } = action;
      const { posts } = state;
      const { oldSelectedSort } = state;
      let newPosts = posts;

      if (sortBy === 'voteScore') {
        newPosts = _.orderBy(posts, ['voteScore'], [sortOrder]);
      } else if (sortBy === 'timestamp') {
        newPosts = _.orderBy(posts, ['timestamp'], [sortOrder]);
      }
      return {
        ...state,
        selectedSort: {
          ...oldSelectedSort,
          by: sortBy,
        },
        posts: newPosts,
      };
    }
    case VOTE_UP_POST_SUCCESS:
    case VOTE_DOWN_POST_SUCCESS: {
      const { post: postWithNewVote } = action;
      const { posts } = state;
      const oldPostIndex = posts.findIndex(p => p.id === postWithNewVote.id);

      return {
        ...state,
        posts: [...posts.slice(0, oldPostIndex), postWithNewVote, ...posts.slice(oldPostIndex + 1, posts.length)],
      };
    }
    default:
      return state;
  }
}

export default postReducer;
