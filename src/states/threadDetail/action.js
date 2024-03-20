import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UP_VOTE_DETAIL_THREAD: 'UP_VOTE_DETAIL_THREAD',
  DOWN_VOTE_DETAIL_THREAD: 'DOWN_VOTE_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toogleUpVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toogleDownVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toogleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toogleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteDetailThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toogleUpVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));

    dispatch(showLoading());

    try {
      await api.toogleUpVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toogleUpVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteDetailThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(toogleDownVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));

    dispatch(showLoading());

    try {
      await api.toogleDownVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toogleDownVoteDetailThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncAddComment({ content, threadId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ content, threadId });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteComment({ commentId }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(toogleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));

    dispatch(showLoading());

    try {
      await api.toggleUpVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toogleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralVoteComment({ commentId }) {
  return async (dispatch, getState) => {
    const { threadDetail } = getState();
    dispatch(showLoading());

    try {
      await api.neutralVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment({ commentId }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    dispatch(toogleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));

    dispatch(showLoading());

    try {
      await api.toggleDownVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toogleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncUpVoteDetailThread,
  toogleUpVoteDetailThreadActionCreator,
  toogleDownVoteDetailThreadActionCreator,
  asyncDownVoteDetailThread,
  asyncAddComment,
  addCommentActionCreator,
  toogleUpVoteCommentActionCreator,
  toogleDownVoteCommentActionCreator,
  asyncUpVoteComment,
  asyncNeutralVoteComment,
  asyncDownVoteComment,
};
