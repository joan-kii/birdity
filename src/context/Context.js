import React, { createContext, useContext, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { auth, db } from '../firebase';

export const Context = createContext();
export const useAuth = () => {
  return useContext(Context);
};

const ContextProvider = (props) => {
  
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openLogInForm, setOpenLogInForm] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [])

  const value = {
    openSignUpForm, setOpenSignUpForm,
    openLogInForm, setOpenLogInForm,
    currentUser, signUp,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;