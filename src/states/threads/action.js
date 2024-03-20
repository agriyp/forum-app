import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toogleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toogleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toogleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));

    dispatch(showLoading());

    try {
      await api.toogleUpVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toogleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralVoteThread({ threadId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toogleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));

    dispatch(showLoading());

    try {
      await api.toogleDownVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toogleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toogleUpVoteThreadActionCreator,
  toogleDownVoteThreadActionCreator,
  asyncAddThread,
  asyncUpVoteThread,
  asyncNeutralVoteThread,
  asyncDownVoteThread,
};
