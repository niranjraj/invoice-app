import React, { useState, useEffect, useContext } from "react";
import { firebase } from "../firebase/initFirebase";

const AuthContext = React.createContext();


export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 function login(){
     console.log("in login")
    
     let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider).then(function(result){
        if (result.credential) {

            let credential = result.credential;
      
            // This gives you a Google Access Token. You can use it to access the Google API.
           let token = credential.accessToken;
            // ...
          }
          // The signed-in user info.
         let  user = result.user;
        }).catch((error) => {
        console.log(error);
      })
 }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
        
        setUser(u);
        setLoading(false);
        
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading,login, logout: () => firebase.auth().signOut() }}
    >
      {children}
    </AuthContext.Provider>
  );
}
