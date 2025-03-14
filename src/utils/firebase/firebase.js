import {initializeApp} from 'firebase/app'
import { 
    getAuth,  //get instance of auth
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,  //google's provider for authentacations
    createUserWithEmailAndPassword,  //create user w email-pasw
    signInWithEmailAndPassword,  //login w email-psw
    signOut,  //disconnect user
    onAuthStateChanged,   //listen changes of the auth state
    updateProfile,  //update auth in local in real-time(i.e. create w email-psw on firebase will not updates the auth in local!)
} from 'firebase/auth'
import {
    getFirestore,
    doc,   //referenc to a doc
    getDoc,  //get data of the doc
    setDoc   //write on the doc
} from 'firebase/firestore'

const vite_apikey = import.meta.env.VITE_APIKEY;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: vite_apikey,
    authDomain: "react-prj1-db.firebaseapp.com", 
    projectId: "react-prj1-db",
    storageBucket: "react-prj1-db.firebasestorage.app",  
    messagingSenderId: "555995369553",
    appId: "1:555995369553:web:4144492821a60a0f5de870"
};
// Initialize Firebase w configs
const firebaseApp = initializeApp(firebaseConfig);


const googleProvider = new GoogleAuthProvider();  //create google's prov x auths
googleProvider.setCustomParameters({  //force the user to select his google account, avoid using the last account by default  
    prompt : "select_account"  
}); //forza l'utente a sceglie l'account x il login senza che acceda automaticamnete con l'ultimo account usato

export const auth = getAuth();  //get global instance of auth on ur app
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);  //open google popup, after the auth state will be saved on 'auth'
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);  //still doesn't work, always login w my google base account 
export const db = getFirestore();  //get instance of firestore's db

export const createUserDocumentFromAuth = async (userAuth, additionalInfo={}) => {
    const {displayName} = additionalInfo;
    //console.log(additionalInfo);
    //console.log(displayName);  //destructuring only x debug, displayName received

    if (!userAuth) return; //return if user isn't authenticated / method was called by mistake
    const userDocRef = doc(db,'users', userAuth.uid); //pointer to the user's doc on firebase
    //console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);  //get user data from the db
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){  //if user doesn't exist on the db, create him
        const {email} = userAuth;  //extract
        const createdAt = new Date();  //now
        try{
            await setDoc(userDocRef,{  //write on the doc, use the pointer to know where
                //displayName,
                email,
                createdAt,
                ...additionalInfo,  //apply directly all additionalInfo including displayName! you will see it on firebase.com
            });
        } catch(error){ console.log('error creting the user', error.message); }
    }  
    return userDocRef;  //return the pointer
}

export const createAuthUserWithEmailAndPassword = async (email,password,   displayName) =>{
    if(!email || !password) return;
    try{
        const {user} = await createUserWithEmailAndPassword(auth,email,password);
        await updateProfile(user,{  //update Firebase Auth in local, without anyway displayName will be saved on firebase.com
            "displayName": displayName,  //NON TROVA DISPLAY! TO FIXX!!
        });
        console.log("updated profile user: ", user);
        return user
    }catch (error) {
        console.error("Error creating user:", error);

    //return await createUserWithEmailAndPassword(auth,email,password);  //return the authenticated user just created
    }
}

export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);  //return the authenticated user
}

export const signOutUser = async () => await signOut(auth);  //disconnect the auth user
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);  //each time the user log-in/log-out, the callback receive the new auth state

