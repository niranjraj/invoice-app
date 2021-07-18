import React, { useState, useEffect, useContext } from "react";

import { firebase } from "../firebase/initFirebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sending, setSending] = useState(false); // for fetching newly added invoices
  const [loading, setLoading] = useState(false); //set for initial loading screen
  const [wait, setWait] = useState(false); // wait state for disabling buttons
  const [error, setError] = useState(null);

  async function login() {
    try {
      setLoading(true);
      const provider = new firebase.auth.GoogleAuthProvider();
      return await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setError("Could not connect...");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      localStorage.removeItem("user");
      await firebase.auth().signOut();
      setUser(null);
      return;
    } catch (error) {
      setError("Something went wrong...");
    }
  }

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = firebase.auth().onAuthStateChanged((newUser) => {
        if (newUser) {
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          setSending(true);
        }
      });
      return () => unsubscribe();
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setLoading,
        setUser,
        login,
        logout,
        setError,
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
