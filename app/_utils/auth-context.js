'use client';
 
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
//This is an auth object we are getting from the firebase.js 
//Firebase handles the authentication from here
import { auth } from "./firebase";
 
//Creating a context which we can wrap around our root component in layout.js 
//(Go to line 39 for the implementation )
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 
  const googleSignIn = async() => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return await signInWithPopup(auth, provider);
  };
 
  const firebaseSignOut = async() => {
    return await signOut(auth);
  };
 
  //onAuthStateChanged gets activated when the component mounts. Here attached the user's state to the current auth context 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    //When the component unmounts it returns a unsubscribe function that makes our onAuthStateChanged stop listening.  
    return () => unsubscribe();
  }, []);
 
  return (
    <AuthContext.Provider value={{ user, googleSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

//This function is what we will use in the rest of our code to access the user variable 
export const useUserAuth = () => {
  return useContext(AuthContext);
};