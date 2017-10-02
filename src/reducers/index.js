import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import post from './post';
import category from './category';

export default combineReducers({
  post,
  category,
  router: routerReducer,
});
