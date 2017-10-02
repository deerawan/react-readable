import * as api from '../util/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
}

export function fetchCategories() {
  return dispatch => api.fetchCategories().then(response => {
      dispatch(receiveCategories(response));
    });
}
