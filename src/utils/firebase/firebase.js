import {initializeApp} from 'firebase/app'
import { 
    getAuth,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqoPybTG3cVKUnk2TIWSluo93t0zI49ic",
    authDomain: "react-prj1-db.firebaseapp.com",
    projectId: "react-prj1-db",
    storageBucket: "react-prj1-db.firebasestorage.app",
    messagingSenderId: "555995369553",
    appId: "1:555995369553:web:4144492821a60a0f5de870"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt : "select_account"
}); //forza l'utente a sceglie l'account x il login senza che acceda automaticamnete con l'ultimo account usato
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo={}) => {
    if (!userAuth) return; // Evita errori se userAuth è null
    const userDocRef = doc(db,'users', userAuth.uid);
    //console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            });
        } catch(error){ console.log('error creting the user', error.message); }
    }  
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}
export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}