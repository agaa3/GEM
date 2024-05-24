import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCANqzFV2BR2Vb3ESA5r1nT1vur6oitSbU",
    authDomain: "gem-store-3a92e.firebaseapp.com",
    projectId: "gem-store-3a92e",
    storageBucket: "gem-store-3a92e.appspot.com",
    messagingSenderId: "454874699827",
    appId: "1:454874699827:web:ece3ae6d25825324aa2b46"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, onAuthStateChanged, signOut };