import * as _ from 'lodash';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  VOTE_UP_POST_REQUEST,
  VOTE_DOWN_POST_REQUEST,
  SORT_POST,
  FETCH_POSTS_BY_CATEGORY_REQUEST,
  FETCH_POSTS_BY_CATEGORY_SUCCESS,
} from '../actions/post';
import * as sortOption from '../util/sortOption';
import { SORT_ORDER, VOTE_TYPE } from '../constant';

const initialState = {
  loading: false,
  posts: [],
  sortOptions: [
    sortOption.voteScore,
    sortOption.dateTime,
    sortOption.title,
    sortOption.author,
  ],
  selectedSort: {
    by: 'voteScore',
    order: SORT_ORDER.desc,
  },
  selectedPost: {
    id: '',
    title: '',
    body: '',
    author: '',
    category: '',
    voteScore: 0,
    commentsCount: 0,
  },
};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        posts: state.posts.concat(action.post),
      };
    }
    case EDIT_POST_REQUEST: {
      return {
        ...state,
        loading: true,
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
        loading: false,
        posts: state.posts.filter(post => post.id !== deletedPost.id),
      };
    }
    case FETCH_POSTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_POSTS_SUCCESS: {
      const { selectedSort: { by, order } } = state;
      return {
        ...state,
        loading: false,
        posts: sortPosts(action.posts, by, order),
      };
    }
    case FETCH_POST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        selectedPost: action.post,
      };
    }
    case FETCH_POST_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case FETCH_POSTS_BY_CATEGORY_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_POSTS_BY_CATEGORY_SUCCESS: {
      const { selectedSort: { by, order } } = state;
      return {
        ...state,
        loading: false,
        posts: sortPosts(action.posts, by, order),
      };
    }
    case SORT_POST: {
      const { posts, selectedSort } = state;
      const { sortBy, sortOrder } = action;

      return {
        ...state,
        selectedSort: {
          ...selectedSort,
          by: sortBy,
          order: sortOrder,
        },
        posts: sortPosts(posts, sortBy, sortOrder),
      };
    }
    case VOTE_UP_POST_REQUEST: {
      return votePost(state, action, VOTE_TYPE.upVote);
    }
    case VOTE_DOWN_POST_REQUEST: {
      return votePost(state, action, VOTE_TYPE.downVote);
    }
    default:
      return state;
  }
}

function votePost(state, action, voteType: string) {
  const { id } = action;
  const { posts, selectedPost, selectedSort: { by, order } } = state;
  const votedPostIndex = posts.findIndex(p => p.id === id);
  if (votedPostIndex < 0) {
    return state;
  }

  const votedPost = posts[votedPostIndex];
  const updatedVotedPost = {
    ...votedPost,
    voteScore:
      voteType === VOTE_TYPE.upVote
        ? votedPost.voteScore + 1
        : votedPost.voteScore - 1,
  };

  const updatedPosts = [
    ...posts.slice(0, votedPostIndex),
    updatedVotedPost,
    ...posts.slice(votedPostIndex + 1, posts.length),
  ];

  // NOTE: update selected post with new vote score as well
  const updatedSelectedPost =
    selectedPost.id === votedPost.id ? updatedVotedPost : selectedPost;

  return {
    ...state,
    posts: sortPosts(updatedPosts, by, order),
    selectedPost: updatedSelectedPost,
  };
}

function sortPosts(posts: Post[], sortBy: string, sortOrder: string) {
  return _.orderBy(posts, [sortBy], [sortOrder]);
}

export default postReducer;
