import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Chat from './../Chat';

describe('Chat Component', () => {
  test('chat renders fine', () => {
    render(<Chat />);
  });

  test('text renders fine', () => {
    render(<Chat />);
    expect(screen.getByText('Birdity SuperChat')).toBeInTheDocument();
    expect(screen.getByText('Enter Message...')).toBeInTheDocument();
    expect(screen.getByTestId('closeButton')).toBeVisible();
    expect(screen.getByTestId('sendButton')).toBeVisible();
    expect(screen.getByTestId('textField')).toBeVisible();
  });
})
