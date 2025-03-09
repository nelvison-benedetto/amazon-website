import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase";

export const GlobalContext = createContext();

export default function GlobalProvider({children}){

    let test = 4;
    const [currentUser, setCurrentUser] = useState(null);
    const authState = {currentUser, setCurrentUser};  //group all in 1var

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            //console.log(user);
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe;
    },[]);

    return(
        <GlobalContext.Provider
            value={{
                authState,  //in target file use double-desctructuration  const {authState}=useContext(GlobalContext); const { currentUser, setCurrentUser }=authState;
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
