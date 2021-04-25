import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import LeftMenu from './../LeftMenu';

describe('LeftMenu Component', () => {
  test('left menu renders fine', () => {
    render(<LeftMenu />);
  });

  test('List items renders fine', () => {
    render(<LeftMenu />);
    expect(screen.getByText('My Birds')).toBeInTheDocument();
    expect(screen.getByText('My Blog')).toBeInTheDocument();
    expect(screen.getByText('My Comments')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });
})