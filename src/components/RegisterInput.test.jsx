/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    // action
    await userEvent.type(nameInput, 'asep');

    // Assert
    expect(nameInput).toHaveValue('asep');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'asep@email.com');

    // Assert
    expect(emailInput).toHaveValue('asep@email.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'asep123');

    // Assert
    expect(passwordInput).toHaveValue('asep123');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'asep');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'asep@email.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'asep123');
    const RegisterButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(RegisterButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'asep',
      email: 'asep@email.com',
      password: 'asep123',
    });
  });
});
