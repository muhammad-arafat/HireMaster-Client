import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";

export const AuthContext=createContext(null)


const AuthProvider = ({children}) => {
 const [user,setUser]=useState(null)
 const [loading,setLoading]=useState(true)
 const googleProvider = new GoogleAuthProvider();




const createUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
}
const signIn=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email,password)
}


useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
    });

    return () => unsubscribe(); 
}, [])
const logOut = () => {
    setLoading(true);
    return signOut(auth);
}



const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
}




const authInfo={
user,
loading ,
createUser,
signIn,
logOut,
googleSignIn
}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;