// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider  } from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firebase Authentication and get a reference to the service Auth
export const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()


// Buat akun
export const createAccount = (email, password) => createUserWithEmailAndPassword(auth, email, password) //then opt credentialUser
export const verification = (user) => sendEmailVerification(user)

// export const verificationEmail = () => {return auth().currentUser}

// Cek eksistensi user dari email
export const UserAlreadyExist = (email) => fetchSignInMethodsForEmail(auth, email) //then //Mengembalikan array

// sign in / login dengan email dan password
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)

// sign in dengan google
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

// sign in dengan facebook
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider)




// firestore

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export const storeAddNewUser = (document, dataMap) => setDoc(doc(db, 'user', document), dataMap)

export const getUser = (uid) => getDoc(doc(db, 'user', uid))