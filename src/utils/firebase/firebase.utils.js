import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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

const provider = new GoogleAuthProvider(); //GoogleAuthProvider is a class
provider.setCustomParameters(
    {
        prompt: "select_account"
    }
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid); // if the db doesn't have a user collection, it will create it
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userDocRef.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
} 


