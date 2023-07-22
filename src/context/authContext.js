import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthcontextProvider = ({children}) => {
    const[currentUser,setcurrentUser] = useState({});

    //cheking user present or not
    useEffect(() => {
        const unsub = onAuthStateChanged(auth,(user) => {
            setcurrentUser(user);
            console.log(user);
        })
        return() => {
            unsub();
        };
    },[])
    
    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
      );

} 