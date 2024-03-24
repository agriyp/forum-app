/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle content typing correctly
 *   - should call addComment function when Tambah button is clicked
 */

import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
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
    render(<CommentInput addComment={() => {}} threadId="thread-v-xjHKKzdF1ikTpE" />);
    const contentInput = await screen.getByPlaceholderText('Isikan komentar...');

    // Action
    await userEvent.type(contentInput, 'komentar pertama');

    // Assert
    expect(contentInput).toHaveValue('komentar pertama');
  });

  it('should call addComment function when Tambah button is clicked', async () => {
    // Arrange
    const mockAddComment = vi.fn();
    render(<CommentInput addComment={mockAddComment} threadId="thread-v-xjHKKzdF1ikTpE" />);
    const contentInput = await screen.getByPlaceholderText('Isikan komentar...');
    await userEvent.type(contentInput, 'komentar pertama');
    const TambahButton = await screen.getByRole('button', { name: 'Tambah' });

    // Action
    await userEvent.click(TambahButton);

    // Assert
    expect(mockAddComment).toBeCalledWith({
      content: 'komentar pertama',
      threadId: 'thread-v-xjHKKzdF1ikTpE',
    });
  });
});
