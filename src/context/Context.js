import React, { createContext, useContext, useState } from 'react';
import firebase from 'firebase/app';
import { auth, db } from '../firebase';

export const Context = createContext();
export const useAuth = () => {
  return useContext(Context);
};

const ContextProvider = (props) => {
  
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const value = {
    openSignUpForm, setOpenSignUpForm
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;