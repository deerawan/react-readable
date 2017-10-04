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
} from '../actions/post';

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
      const oldPostIndex = state.posts.findIndex(
        post => post.id === editedPost.id
      );
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
      const { selectedSort: { by, order } } = state;
      return {
        ...state,
        posts: sortPosts(action.posts, by, order),
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
      const { selectedSort } = state;
      const { by, order } = selectedSort;
      const { sortBy = by, sortOrder = order } = action;
      const { posts } = state;

      return {
        ...state,
        selectedSort: {
          ...selectedSort,
          by: sortBy,
        },
        posts: sortPosts(posts, sortBy, sortOrder),
      };
    }
    case VOTE_UP_POST_SUCCESS:
    case VOTE_DOWN_POST_SUCCESS: {
      const { post: postWithNewVote } = action;
      const { posts, selectedSort: { by, order } } = state;
      const oldPostIndex = posts.findIndex(p => p.id === postWithNewVote.id);
      const updatedPosts = [
        ...posts.slice(0, oldPostIndex),
        postWithNewVote,
        ...posts.slice(oldPostIndex + 1, posts.length),
      ];

      return {
        ...state,
        posts: sortPosts(updatedPosts, by, order),
      };
    }
    default:
      return state;
  }
}

function sortPosts(posts, sortBy, sortOrder) {
  let newOrderedPosts = posts;

  if (sortBy === 'voteScore') {
    newOrderedPosts = _.orderBy(posts, ['voteScore'], [sortOrder]);
  } else if (sortBy === 'timestamp') {
    newOrderedPosts = _.orderBy(posts, ['timestamp'], [sortOrder]);
  }

  return newOrderedPosts;
}

export default postReducer;
