import * as uuid from 'uuid';
import * as _ from 'lodash';
import { ADD_POST_SUCCESS, RECEIVE_POSTS, SORT_POST } from '../actions';

function post(state = [], action) {
  switch (action.type) {
    case ADD_POST_SUCCESS: {
      return state.concat(action.post);
    }
    case RECEIVE_POSTS: {
      const { posts } = action;
      return posts;
    }
    case SORT_POST: {
      const { sortBy, sortOrder } = action;
      if (sortBy === 'voteScore') {
        return _.orderBy(state, ['voteScore']);
      } else if (sortBy === 'timestamp') {
        return _.orderBy(state, ['timestamp']);
      }
      return state;
    }
    default:
      return state;
  }
}

export default post;
