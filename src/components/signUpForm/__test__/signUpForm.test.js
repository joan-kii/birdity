import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import SignUpForm from '../SignUpForm';
import { Context } from '../../../context/Context';


describe('Sign Up Modal', () => {

  const renderSignUpModal = (
    <Context.Provider 
      value={{openSignUpForm: true, openLogInForm: true}}>
      <SignUpForm />
    </Context.Provider>
  );

  test('sign up modal renders fine', () => {
    render(renderSignUpModal)
  });

  test('form title and text modal toggle renders fine', () => {
    render(renderSignUpModal)
    expect(screen.getAllByText('Sign Up')[0]).toBeInTheDocument();
    expect(screen.getByText('Already have an account? Log in.')).toBeInTheDocument();
  });

  test('social media sign up buttons renders fine', () => {
    render(renderSignUpModal);
    expect(screen.getByTestId('facebookSignUpButton')).toHaveTextContent('Sign Up with Facebook');
    expect(screen.getByTestId('twitterSignUpButton')).toHaveTextContent('Sign Up with Twitter');
    expect(screen.getByTestId('googleSignUpButton')).toHaveTextContent('Sign Up with Google');
    expect(screen.getByTestId('emailSignUpButton')).toHaveTextContent('Sign Up');
  });

  test('text fields renders fine', () => {
    render(renderSignUpModal);
    
    const emailField = screen.getByTestId('email');
    const emailFake = 'test@test.com';
    const passwordField = screen.getByTestId('password');
    const passwordFake = '123456';
    const confirmPasswordField = screen.getByTestId('confirmPassword');

    expect(emailField).toBeInTheDocument();
    userEvent.type(emailField.children[1].children[0], emailFake);
    expect(emailField.children[1].children[0]).toHaveAttribute('type', 'email');
    expect(emailField.children[1].children[0]).toHaveValue(emailFake);

    expect(passwordField).toBeInTheDocument();
    userEvent.type(passwordField.children[1].children[0], passwordFake);
    expect(passwordField.children[1].children[0]).toHaveAttribute('type', 'password');
    expect(passwordField.children[1].children[0]).toHaveValue(passwordFake);

    expect(confirmPasswordField).toBeInTheDocument();
    userEvent.type(confirmPasswordField.children[1].children[0], passwordFake);
    expect(confirmPasswordField.children[1].children[0]).toHaveAttribute('type', 'password');
    expect(confirmPasswordField.children[1].children[0]).toHaveValue(passwordFake);
  });
});