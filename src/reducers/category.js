import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
} from '../actions/category';

const initialState = {
  loading: false,
  categories: [],
};

function category(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_CATEGORIES_SUCCESS: {
      const { categories } = action;
      return {
        ...state,
        loading: false,
        categories,
      };
    }
    default:
      return state;
  }
}

export default category;
