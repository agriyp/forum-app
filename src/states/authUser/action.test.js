/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action and set authUser when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 * - asyncUnsetAuthUser thunk
 *  - should dispatch action and unset authUser
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';
import api from '../../utils/api';

const fakeLoginResponse =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItZXBXTk1Fa2E4eXpKWmpraSIsImlhdCI6MTcxMTAxMTEyN30.-bRy0QXdG5dCfyJvoWD7M9yz6ZyadeuLeFAbnWkqy7c';

const fakeAuthUserResponse = {
  id: 'user-epWNMEka8yzJZjki',
  name: 'asep',
  email: 'asep@email.com',
  avatar: 'https://ui-avatars.com/api/?name=asep&background=random',
};

const fakeErrorResponse = new Error('login failed');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;

    // delete backup data
    delete api._login;
    delete api._putAccessToken;
  });

  it('should dispatch action and set authUser when data fetching success', async () => {
    // arrange
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.putAccessToken(fakeLoginResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    // login data
    const user = {
      email: 'asep@email.com',
      password: 'asep123',
    };

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser(user)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();
    // login data
    const user = {
      email: 'asep@email.com',
      password: 'asep123',
    };

    // action
    await asyncSetAuthUser(user)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  it('should dispatch action and unset authUser', async () => {
    // arrange
    // mock dispatch
    const dispatch = vi.fn();
    // action
    await asyncUnsetAuthUser()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    api.putAccessToken('');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
