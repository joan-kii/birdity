import React from 'react';
import { render } from '@testing-library/react';
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
})