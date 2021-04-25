import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Topbar from './../Topbar';

describe('Topbar Component', () => {
  test('topbar renders fine', () => {
    render(<Topbar />);
  });

  test('Logo and slogan renders fine', () => {
    render(<Topbar />);
    expect(screen.getByText('Birdity')).toBeInTheDocument();
    expect(screen.getByText('The Birdwatching Social Network')).toBeInTheDocument();
  });
  
  test('Buttons renders fine', () => {
    render(<Topbar />);
    expect(screen.getByTestId('chatButton')).toHaveTextContent('Chat');
    expect(screen.getByTestId('exploreButton')).toHaveTextContent('Explore');
    expect(screen.getByTestId('loginButton')).toHaveTextContent('Log In');
  });
});

