import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import LogInForm from '../LogInForm';
import { Context } from '../../../context/Context';


describe('Log In Modal', () => {

  const renderLogInModal = (
    <Context.Provider 
      value={{openSignUpForm: true, openLogInForm: true}}>
      <LogInForm />
    </Context.Provider>
  );

  test('lof in modal renders fine', () => {
    render(renderLogInModal)
  });

  test('form title and text modal toggle renders fine', () => {
    render(renderLogInModal)
    expect(screen.getAllByText('Log in')[0]).toBeInTheDocument();
    expect(screen.getByText('Need an account? Sign up.')).toBeInTheDocument();
  });

  test('social media log in buttons renders fine', () => {
    render(renderLogInModal);
    expect(screen.getByTestId('facebookLogInButton')).toHaveTextContent('Log in with Facebook');
    expect(screen.getByTestId('twitterLogInButton')).toHaveTextContent('Log in with Twitter');
    expect(screen.getByTestId('googleLogInButton')).toHaveTextContent('Log in with Google');
    expect(screen.getByTestId('emailLogInButton')).toHaveTextContent('Log in');
  });

  test('text fields renders fine', () => {
    render(renderLogInModal);
    
    const emailField = screen.getByTestId('email');
    const emailFake = 'test@test.com';
    const passwordField = screen.getByTestId('password');
    const passwordFake = '123456';

    expect(emailField).toBeInTheDocument();
    userEvent.type(emailField.children[1].children[0], emailFake);
    expect(emailField.children[1].children[0]).toHaveAttribute('type', 'email');
    expect(emailField.children[1].children[0]).toHaveValue(emailFake);

    expect(passwordField).toBeInTheDocument();
    userEvent.type(passwordField.children[1].children[0], passwordFake);
    expect(passwordField.children[1].children[0]).toHaveAttribute('type', 'password');
    expect(passwordField.children[1].children[0]).toHaveValue(passwordFake);
  });
});