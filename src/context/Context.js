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
  const [loading, setLoading] = useState(true);
  const [signInError, setSignInError] = useState(false);

  // Sign Up Functions

  const signUp = (email, password, name) => {
    setLoading(true)
    return auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
      const user = credentials.user;
      user.updateProfile({
        displayName: name,
      });
      setSignInError(false);
    }).catch(() => {
      setSignInError(true);
    });
  };

  const googleSignUp = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider).then(() => {
      setSignInError(false);
    }).catch(() => {
      setSignInError(true);
    });
  };

  const facebookSignUp = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    return auth.signInWithPopup(provider).then(() => {
      setSignInError(false);
    }).catch(() => {
      setSignInError(true);
    });
  };

  const twitterSignUp = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return auth.signInWithPopup(provider).then(() => {
      setSignInError(false);
    }).catch(() => {
      setSignInError(true);
    });
  };

  // Log In

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password).then(() => {
      setSignInError(false);
    }).catch(() => {
      setSignInError(true);
    });
  };

  // Log Out

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [])

  const value = {
    openSignUpForm, setOpenSignUpForm,
    openLogInForm, setOpenLogInForm,
    currentUser, signUp, signInError,
    setSignInError,
    googleSignUp, facebookSignUp,
    twitterSignUp, logout, login,
  };

  return (
    <Context.Provider value={value}>
      {!loading && props.children}
    </Context.Provider>
  );
};

export default ContextProvider;