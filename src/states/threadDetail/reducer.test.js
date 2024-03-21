/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREAD_DETAIL action
 *  - should return null when given by CLEAR_THREAD_DETAIL action
 *  - should return new userid in upVotesBy thread when given by UP_VOTE_DETAIL_THREAD action
 *  - should return new userid in downVotesBy thread when given by DOWN_VOTE_DETAIL_THREAD action
 *  - should return the comments with the new comment when given by ADD_COMMENT action
 *  - should return new userid in upVotesBy comment when given by UP_VOTE_COMMENT action
 *  - should return new userid in downVotesBy comment when given by DOWN_VOTE_COMMENT action
 *
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-Np47p4jhUXYhrhRn',
          title: 'Bagaimana pengalamanmu belajar Redux?',
          body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
          createdAt: '2023-05-29T07:55:52.266Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
          },
          category: 'redux',
          comments: [],
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      category: 'redux',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: 'CLEAR_THREAD_DETAIL',
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return new userid in upVotesBy thread when given by UP_VOTE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      category: 'redux',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: 'UP_VOTE_DETAIL_THREAD',
      payload: {
        threadId: 'thread-Np47p4jhUXYhrhRn',
        userId: 'user-mQhLzINW_w5TxxYf',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({ ...initialState, upVotesBy: [action.payload.userId] });
  });

  it('should return new userid in downVotesBy thread when given by DOWN_VOTE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      category: 'redux',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: 'DOWN_VOTE_DETAIL_THREAD',
      payload: {
        threadId: 'thread-Np47p4jhUXYhrhRn',
        userId: 'user-mQhLzINW_w5TxxYf',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({ ...initialState, downVotesBy: [action.payload.userId] });
  });

  it('should return the comments with the new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      category: 'redux',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-3',
          content: 'Ceritanya bagus banget',
          createdAt: '2023-05-29T07:55:52.266Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({ ...initialState, comments: [action.payload.comment] });
  });

  it('should return new userid in upVotesBy comment when given by UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-91KocEqYPRz68MhD',
      title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
      body: 'Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?',
      createdAt: '2023-05-29T07:54:35.746Z',
      owner: {
        id: 'user-aROWej8yYA1sOfHN',
        name: 'Dicoding',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      category: 'perkenalan',
      comments: [
        {
          id: 'comment-XhqYiuyhZm1mWHqn',
          content: 'Halo!<br>Perkanalkan, nama saya Dimas.',
          createdAt: '2023-05-29T07:59:04.689Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: 'UP_VOTE_COMMENT',
      payload: {
        commentId: 'comment-XhqYiuyhZm1mWHqn',
        userId: 'user-mQhLzINW_w5TxxYf',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{ ...initialState.comments[0], upVotesBy: [action.payload.userId] }],
    });
  });

  it('should return new userid in downVotesBy comment when given by DOWN_VOTE_COMMENT action', () => {
    const initialState = {
      id: 'thread-91KocEqYPRz68MhD',
      title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
      body: 'Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?',
      createdAt: '2023-05-29T07:54:35.746Z',
      owner: {
        id: 'user-aROWej8yYA1sOfHN',
        name: 'Dicoding',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      category: 'perkenalan',
      comments: [
        {
          id: 'comment-XhqYiuyhZm1mWHqn',
          content: 'Halo!<br>Perkanalkan, nama saya Dimas.',
          createdAt: '2023-05-29T07:59:04.689Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: 'DOWN_VOTE_COMMENT',
      payload: {
        commentId: 'comment-XhqYiuyhZm1mWHqn',
        userId: 'user-mQhLzINW_w5TxxYf',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{ ...initialState.comments[0], downVotesBy: [action.payload.userId] }],
    });
  });
});
