import React, { useState, useEffect, useContext } from "react";

import { firebase } from "../firebase/initFirebase";
import { setUserId } from "../services/api";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [sending,setSending]=useState(false) // set when data is updated or added and unset after get
  const [loading, setLoading] = useState(true); //set for initial loading screen
  const [wait,setWait]=useState(false);



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
        setLoading(false);
        setSending(true);

     
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, setLoading, login, logout,setSending,sending,setWait,wait }}>
      {children}
    </AuthContext.Provider>
  );
}
