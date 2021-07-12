import React, { useState, useEffect, useContext} from "react";

import { firebase } from "../firebase/initFirebase";
import { setUserId } from "../services/api";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sending, setSending] = useState(false); // for fetching newly added invoices 
  const [loading, setLoading] = useState(true); //set for initial loading screen
  const [wait, setWait] = useState(false); // wait state for disabling buttons
  async function login() {
    try {
      setLoading(true);
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithRedirect(provider);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    await firebase.auth().signOut();
    setUser(null);
    return;
  }
  function firstLogin() {
    if (user) {
      const checkLogin =
        user.metadata.creationTime === user.metadata.lastSignInTime;
      if (checkLogin) {
        setUserId(user.uid, user.displayName, user.photoURL);
      }
    }
  }

  useEffect(() => {
    try {
      const unsubscribe = firebase.auth().onAuthStateChanged((newUser) => {
        if (newUser) {
          setUser(newUser)
          setSending(true);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setLoading,
        setUser,
        login,
        logout,
        firstLogin,
        setSending,
        sending,
        setWait,
        wait,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
