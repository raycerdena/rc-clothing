// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,FacebookAuthProvider,signInWithPopup 
} from "firebase/auth";
import { 
 getFirestore,doc,setDoc,
 getDoc
} from "firebase/firestore";
import { use } from "react";
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
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
googleProvider.setCustomParameters({
    prompt:"select_account"
})

 const auth = getAuth();
 const signInWithGooglePopUp = async ()=> signInWithPopup(auth,new GoogleAuthProvider());
 const signInWithFacebookPopUp = async ()=> signInWithPopup(auth,facebookProvider);
 const db = getFirestore();
 const createUserDocumentFromAuth = async (userAuth)=>{
 const userDocRef = doc(db,'users',userAuth.uid);
 const userSnapshot = await getDoc(userDocRef);

 if(!userSnapshot.exists()){
  const {displayName, email} = userAuth;
  const createdAt = new Date();
  try{
    await setDoc(userDocRef,{displayName,email,createdAt});
  }catch(err){
    console.error('error creating user',err);
  }
   
 }
 return userDocRef;
 }
 export {auth,signInWithGooglePopUp,signInWithFacebookPopUp,firebaseApp,db,createUserDocumentFromAuth};
//export const signInWithFacebookPopUp =  signInWithPopup(auth, facebookProvider);