import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyDFFk6F3djMCt9KrPb5gSkSGAhmV92ljN0",
    authDomain: "yo-50b0e.firebaseapp.com",
    projectId: "yo-50b0e",
    storageBucket: "yo-50b0e.appspot.com",
    messagingSenderId: "61268319752",
    appId: "1:61268319752:web:9b3ab49f24bc1209047bbd"
  };

  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db , auth, provider };
  