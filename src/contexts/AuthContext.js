import React, { useState, useEffect, useContext } from "react";
import { firebase } from "../firebase/initFirebase";
import { setUserId } from "../services/api";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sending,setSending]=useState(false)
  const [loading, setLoading] = useState(true);

  async function login() {
    try {
      setLoading(true);
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithRedirect(provider);
      
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    return await firebase.auth().signOut();
  }

  useEffect(() => {
    try {
     
      const unsubscribe = firebase.auth().onAuthStateChanged((newUser) => {
        if (newUser &&!user) {
          console.log("in use effect auth")
          setUserId(newUser.uid, newUser.displayName, newUser.photoURL);
        }
        setUser(newUser);
        setSending(true)
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, setLoading, login, logout,setSending,sending }}>
      {children}
    </AuthContext.Provider>
  );
}
