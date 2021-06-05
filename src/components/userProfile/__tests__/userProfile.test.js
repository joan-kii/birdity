import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import UserProfile from './../UserProfile';

describe('LeftMenu Component', () => {
  test('left menu renders fine', () => {
    render(<UserProfile />);
  });

  test('List items renders fine', () => {
    render(<UserProfile />);
    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Birdity User since:')).toBeInTheDocument();
  });
})