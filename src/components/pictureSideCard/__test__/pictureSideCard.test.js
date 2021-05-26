import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PictureSideCard from './../PictureSideCard';

describe('PictureSideCard Component', () => {
  test('picture side card renders fine', () => {
    render(<PictureSideCard />);
  });

  test('the title card renders fine', () => {
    render(<PictureSideCard />);
    expect(screen.getByText('Picture Of The Day')).toBeInTheDocument();
  });
})