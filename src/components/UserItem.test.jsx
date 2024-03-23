/**
 * skenario testing
 *
 * - UserItem component
 *   - must check the value of the component according to the props
 */

import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import UserItem from './UserItem';

expect.extend(matchers);

describe('UserItem component', async () => {
  const leaderboards = {
    user: {
      id: 'user-mQhLzINW_w5TxxYf',
      name: 'Dimas Saputra',
      email: 'dimas@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    },
    score: 25,
  };

  it('should check the value of the component according to the props', async () => {
    // arrange
    render(<UserItem user={leaderboards.user} score={leaderboards.score} />);
    const nameUser = await screen.getByText('Dimas Saputra');
    const scoreUser = await screen.getByText('25');

    // assert
    expect(nameUser).toBeInTheDocument();
    expect(scoreUser).toBeInTheDocument();
  });
});
