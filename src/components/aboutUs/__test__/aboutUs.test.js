import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AboutUs from './../AboutUs';

const paragraphOne = 'This is just a fake social network for bird lovers like a web app exercise at The Odin Project. It is made using React, React Router, Material-UI, and Firebase. It also has a simple chat implemented and makes use of a bird tracking API.'
const paragraphTwo = 'If you are interested in learning web development, I highly recommend The Odin Project. You can see my slow but steady progress in the web development journey on my Github.'

describe('AboutUS Component', () => {
  test('about us renders fine', () => {
    render(<AboutUs />);
  });

  test('text renders fine', () => {
    render(<AboutUs />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText(paragraphOne)).toBeInTheDocument();
    expect(screen.getByText(paragraphTwo)).toBeInTheDocument();
  });
})
