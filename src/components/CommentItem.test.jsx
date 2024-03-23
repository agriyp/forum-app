/**
 * skenario testing
 *
 * - CommentItem component
 *   - must check the value of the component according to the props
 */

import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import CommentItem from './CommentItem';

expect.extend(matchers);

describe('CommentItem component', () => {
  const comment = {
    id: 'comment-XhqYiuyhZm1mWHqn',
    content: 'Halo! Perkanalkan, nama saya Dimas.',
    createdAt: '2023-05-29T07:59:04.689Z',
    owner: {
      id: 'user-mQhLzINW_w5TxxYf',
      name: 'Dimas Saputra',
      avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    },
    upVotesBy: [],
    downVotesBy: [],
  };

  const authUser = 'user-aROWej8yYA1sOfHN';

  it('must check the value of the component according to the props', async () => {
    // arrange
    render(
      <CommentItem
        {...comment}
        onUpVoteComment={() => {}}
        onDownVoteComment={() => {}}
        authUser={authUser}
      />,
    );
    const contentComment = await screen.getByText('Halo! Perkanalkan, nama saya Dimas.');
    const userInfoComment = await screen.getByText('Dimas Saputra');

    // assert
    expect(contentComment).toBeInTheDocument();
    expect(userInfoComment).toBeInTheDocument();
  });
});
