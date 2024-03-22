/**
 * skenario test
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action and set authUser when preload process success
 *  - should dispatch action and return null when fallback process
 *  - should dispatch action and return false when end preload process
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const fakeAuthUserResponse = {
  id: 'user-epWNMEka8yzJZjki',
  name: 'asep',
  email: 'asep@email.com',
  avatar: 'https://ui-avatars.com/api/?name=asep&background=random',
};

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;

    // delete backup data
    delete api._getOwnProfile;
  });

  it('should dispatch action and set authUser when preload process success', async () => {
    // arrange
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and return null when fallback process', async () => {
    // arrange
    api.getOwnProfile = () => Promise.reject(fakeAuthUserResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and return false when end preload process', async () => {
    // arrange
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
