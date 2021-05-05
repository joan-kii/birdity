import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Topbar from '../Topbar';
import { Context } from '../../../context/Context';

describe('Topbar Component', () => {

  const renderTopbar = (
    <Context.Provider 
      value={{openSignUpForm: true, openLogInForm: true}}>
      <Topbar />
    </Context.Provider>
  );

  const renderUserLoggedTopbar = (
    <Context.Provider 
      value={{openSignUpForm: true, openLogInForm: true, currentUser: true}}>
      <Topbar />
    </Context.Provider>
  );

  test('topbar renders fine', () => {
    render(renderTopbar);
  });

  test('Logo and slogan renders fine', () => {
    render(renderTopbar);
    expect(screen.getByText('Birdity')).toBeInTheDocument();
    expect(screen.getByText('The Birdwatching Social Network')).toBeInTheDocument();
  });
  
  test('Buttons renders fine', () => {
    render(renderTopbar);
    expect(screen.getByTestId('chatButton')).toHaveTextContent('Chat');
    expect(screen.getByTestId('exploreButton')).toHaveTextContent('Explore');
    expect(screen.getByTestId('loginButton')).toHaveTextContent('Log In');
  });

  test('Sign up button change to logout when the user is logged', () => {
    render(renderUserLoggedTopbar);
    expect(screen.getByTestId('loginButton')).toHaveTextContent('Log Out');
  });
});

