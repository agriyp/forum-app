/**
 * test scenario for filterCategoryReducer
 *
 * - filterCategoryReducer function
 *  - should return the initial state when given by unknown action
 *  - should return filterCategory when given by FILTER_THREADS_BY_CATEGORY action
 */

import { describe, it, expect } from 'vitest';
import filterCategoryReducer from './reducer';

describe('filterCategoryReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = '';
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = filterCategoryReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return filterCategory when given by FILTER_THREADS_BY_CATEGORY action', () => {
    // arrange
    const initialState = '';
    const action = {
      type: 'FILTER_THREADS_BY_CATEGORY',
      payload: {
        category: 'general',
      },
    };

    // action
    const nextState = filterCategoryReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.category);
  });
});
