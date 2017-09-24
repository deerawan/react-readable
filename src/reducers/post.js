import * as _ from 'lodash';
import {
  ADD_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  EDIT_POST_SUCCESS,
  RECEIVE_POSTS,
  RECEIVE_POST_SUCCESS,
  SORT_POST,
} from '../actions';

const initialState = {
  posts: [],
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
        posts: state.concat(action.post),
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
      console.log(action);
      return {
        ...state,
        selectedPost: action.post,
      };
    }
    case SORT_POST: {
      const { sortBy, sortOrder } = action;
      const { posts } = state;
      let newPosts = posts;

      if (sortBy === 'voteScore') {
        newPosts = _.orderBy(posts, ['voteScore']);
      } else if (sortBy === 'timestamp') {
        newPosts = _.orderBy(posts, ['timestamp']);
      }
      return {
        ...state,
        posts: newPosts,
      };
    }
    default:
      return state;
  }
}

export default postReducer;
