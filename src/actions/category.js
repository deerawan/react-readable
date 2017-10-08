import * as api from '../util/api';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export function fetchCategoriesRequest() {
  return {
    type: FETCH_CATEGORIES_REQUEST,
  };
}

export function fetchCategoriesSuccess(categories) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    categories,
  };
}

export function fetchCategories() {
  return dispatch => {
    dispatch(fetchCategoriesRequest());
    return api.fetchCategories().then(response => {
      dispatch(fetchCategoriesSuccess(response));
    });
  };
}
