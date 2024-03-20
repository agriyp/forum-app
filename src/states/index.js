import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import filterCategoryReducer from './filterCategory/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    threads: threadsReducer,
    isPreload: isPreloadReducer,
    threadDetail: threadDetailReducer,
    loadingBar: loadingBarReducer,
    leaderboards: leaderboardsReducer,
    filterCategory: filterCategoryReducer,
  },
});

export default store;
