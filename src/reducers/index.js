import { combineReducers } from 'redux';
import post from './post';
import category from './category';

export default combineReducers({
  post,
  category
})