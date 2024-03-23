/**
 * skenario testing
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 */

import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ThreadInput from './ThreadInput';
import store from '../states/index';

expect.extend(matchers);

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadInput addThreadHandler={() => {}} />
        </BrowserRouter>
      </Provider>,
    );
    const titleInput = await screen.getByPlaceholderText('Isikan judul...');

    // Action
    await userEvent.type(titleInput, 'minggu kelabu');

    // Assert
    expect(titleInput).toHaveValue('minggu kelabu');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadInput addThreadHandler={() => {}} />
        </BrowserRouter>
      </Provider>,
    );
    const categoryInput = await screen.getByPlaceholderText('Isikan kategori...');

    // Action
    await userEvent.type(categoryInput, 'gabut');

    // Assert
    expect(categoryInput).toHaveValue('gabut');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThreadInput addThreadHandler={() => {}} />
        </BrowserRouter>
      </Provider>,
    );
    const bodyInput = await screen.getByPlaceholderText('Isikan apa yang kamu pikirkan...');

    // Action
    await userEvent.type(bodyInput, 'lorem ipsum lorem ipsum');

    // Assert
    expect(bodyInput).toHaveValue('lorem ipsum lorem ipsum');
  });
});
