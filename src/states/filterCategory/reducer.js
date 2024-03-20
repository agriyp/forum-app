import { ActionType } from './action';

function filterCategoryReducer(filterCategory = '', action = {}) {
  switch (action.type) {
    case ActionType.FILTER_THREADS_BY_CATEGORY:
      return action.payload.category;
    default:
      return filterCategory;
  }
}

export default filterCategoryReducer;
