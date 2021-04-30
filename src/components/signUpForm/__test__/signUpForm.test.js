import React from 'react';
import { render, screen } from '@testing-library/react';
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

  /* test('text fields renders fine', () => {
    render(renderSignUpModal);
    expect(screen.getBy('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  }) */
})