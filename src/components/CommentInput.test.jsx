/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle content typing correctly
 */

import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import CommentInput from './CommentInput';

expect.extend(matchers);

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle content typing correctly', async () => {
    // Arrange
    render(<CommentInput addCommentHandler={() => {}} />);
    const contentInput = await screen.getByPlaceholderText('Isikan komentar...');

    // Action
    await userEvent.type(contentInput, 'komentar pertama');

    // Assert
    expect(contentInput).toHaveValue('komentar pertama');
  });
});
