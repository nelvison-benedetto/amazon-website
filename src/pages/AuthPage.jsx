import { useEffect } from 'react';
import { getRedirectResult, onAuthStateChanged } from 'firebase/auth'

import {
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth
} from '../utils/firebase/firebase'
import SignUpForm from '../components/auth/SignUpForm/SignUpForm';
import SignInForm from '../components/auth/SignInForm/SignInForm';

export default function AuthPage(){

    //DONT'T DELETE!
////  Login with Redirect doesn't add new User on firebase!!   
    // useEffect(() => {
    //     const fetchRedirectResult = async () => {  //correct method x use async within useEffect()
    //         try {
    //             const response = await getRedirectResult(auth);
    //             if (response) {  //non mi trova il mio account selezionato!
    //                 console.log("Redirect result:", response);
    //                 await createUserDocumentFromAuth(response.user);
    //             }
    //         } catch (error) {
    //             console.error("Error handling redirect sign-in:", error);
    //         }
    //     };
    //     fetchRedirectResult(); // Controlla il redirect al primo render
    //     // Monitorare continuamente i cambiamenti nello stato di autenticazione
    //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             console.log("User detected via onAuthStateChanged:", user);  //MI SELEZIONA SEMPRE account nelvy24b anche se ne seleziono altri!!
    //             //await createUserDocumentFromAuth(user); // Assicura che l'utente venga registrato su Firestore
    //         }
    //     });
    //     return () => unsubscribe(); // Cleanup della funzione quando il componente si smonta
    // }, []);
////

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);  //ora vedi utente loggato dentro in firestoneweb>firestone db>data
    };  
    
    return (
        <>
            <span>Auth Page</span>
            <button onClick={logGoogleUser}>Sign-In with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign-In with Google Redirect</button>
            <SignInForm/>
            <SignUpForm/>
        </>
    );
}