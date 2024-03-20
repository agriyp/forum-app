const ActionType = {
  FILTER_THREADS_BY_CATEGORY: 'FILTER_THREADS_BY_CATEGORY',
};

function filterCategoryBy(category) {
  return {
    type: ActionType.FILTER_THREADS_BY_CATEGORY,
    payload: {
      category,
    },
  };
}

export { ActionType, filterCategoryBy };
