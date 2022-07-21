import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC9fxJuDyfpQhzLDXkEcgI80U3VeNJNO6M",
    authDomain: "sisi-e3b11.firebaseapp.com",
    projectId: "sisi-e3b11",
    storageBucket: "sisi-e3b11.appspot.com",
    messagingSenderId: "803933850626",
    appId: "1:803933850626:web:8f7bf2dd9586e1ba5ceb1b"
  };

  let app;

if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db,auth};