import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import NewPostArea from './../NewPostArea';

describe('NewPostArea Component', () => {
  test('new post area renders fine', () => {
    render(<NewPostArea />);
  });

  test('Text field and buttons renders fine', () => {
    render(<NewPostArea />);

    const postTextField = screen.getByTestId('postTextField');

    expect(postTextField).toHaveTextContent('Create a Post');
    userEvent.click(postTextField);
    expect(screen.getByPlaceholderText('Max. 150 chars.')).toBeInTheDocument();
    expect(screen.getByTestId('sendPostButton')).toHaveTextContent('Send');
    expect(screen.getByTestId('addFileButton')).toBeVisible();
  });
})