// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import {
  getFirestore, doc, setDoc,
  getDoc
} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU6mj913Z4evqrKRFDy46liA5bihqfZsw",
  authDomain: "crwn-clothing-db-763eb.firebaseapp.com",
  projectId: "crwn-clothing-db-763eb",
  storageBucket: "crwn-clothing-db-763eb.firebasestorage.app",
  messagingSenderId: "100243205450",
  appId: "1:100243205450:web:63f8640b78ca584376a5b3"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

const authProvider = new GoogleAuthProvider();
authProvider.setCustomParameters({
  prompt: "select_account"
});

export const signInWithGooglePopUp = () => signInWithPopup(auth, authProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, authProvider);
export const db = getFirestore(firebaseApp);
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
    } catch (err) {
      console.error('error creating user', err);
    }

  }
  return userDocRef;
}
setPersistence(auth, browserSessionPersistence);

export const createAuthUserWithEmailAndPassword = async (email, password) => {

  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailandPassword = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
//export {auth,signInWithFacebookPopUp,firebaseApp,db,createUserDocumentFromAuth,signInWithGoogleRedirect};
//export const signInWithFacebookPopUp =  signInWithPopup(auth, facebookProvider);