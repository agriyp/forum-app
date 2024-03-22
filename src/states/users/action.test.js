/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncRegisterUser } from './action';
import api from '../../utils/api';

const fakeRegisterResponse = {
  id: 'user-8RmuZHntmr5TsEy4',
  name: 'rudi',
  email: 'rudi@email.com',
  avatar: 'https://ui-avatars.com/api/?name=rudi&background=random',
};

const fakeErrorResponse = new Error('user not created');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;

    // delete backup data
    delete api._register;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeRegisterResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // register data
    const user = {
      name: 'rudi',
      email: 'rudi@email.com',
      password: 'rudi',
    };

    // action
    await asyncRegisterUser(user)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();
    // register data
    const user = {
      name: 'rudi',
      email: 'rudi@email.com',
      password: 'rudi',
    };

    // action
    await asyncRegisterUser(user)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
