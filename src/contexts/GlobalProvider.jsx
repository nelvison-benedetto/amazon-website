import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase";

export const GlobalContext = createContext();

export default function GlobalProvider({children}){

    let test = 4;
    const [currentUser, setCurrentUser] = useState(null);
    const authState = {currentUser, setCurrentUser};  //group all in 1var
    console.log(currentUser);
    console.log(authState);

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{  //each time the user log-in/log-out, the callback receive the new auth state
            //run this block each time firebas's onAuthStateChanged detect user's state changes
            if(user){  //if the user is already logged, call createUserDocumentFromAuth
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user); //also if the user is now anauth, set the currentUser  
        })
        return unsubscribe;  //avoid active listeners even when the component was destroyed 
    },[]);

    return(
        <GlobalContext.Provider
            value={{
                authState,  //in target file use double-desctructuration   const {authState}=useContext(GlobalContext); const { currentUser, setCurrentUser }=authState;
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
