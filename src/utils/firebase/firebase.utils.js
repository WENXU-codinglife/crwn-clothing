import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword ,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbooYWoiz1qOPjxyZDaxOuPRoBZkZ9Zq4",
  authDomain: "crwn-clothing-712d1.firebaseapp.com",
  projectId: "crwn-clothing-712d1",
  storageBucket: "crwn-clothing-712d1.appspot.com",
  messagingSenderId: "595364879456",
  appId: "1:595364879456:web:26e805ec4755ba45f9f705"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); //GoogleAuthProvider is a class
googleProvider.setCustomParameters(
    {
        prompt: "select_account"
    }
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signinwithGoogleRedirect = () => signinwithGoogleRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid); // if the db doesn't have a user collection, it will create it
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
} 

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}