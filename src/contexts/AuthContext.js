import React, { useState, useEffect, useContext } from "react";
import { firebase } from "../firebase/initFirebase";
import { addInvoice, setUserId } from "../services/api";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function getId() {
  return firebase.auth().currentUser.id;
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  function login() {
    try {
      setLoading(true);
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then((res) => {
          if (res.user) {
            setUser(res.user);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    return firebase.auth().signOut();
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
      setUser(u);
      if (u) {
        setUserId(u.uid, u.displayName, u.photoURL);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading,setLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
