import firebase from 'firebase'

import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCx8LqaEx9VHKrlqNTJI9ihBBQE-CdaYx8",
    authDomain: "pruebabemovil-6ab32.firebaseapp.com",
    projectId: "pruebabemovil-6ab32",
    storageBucket: "pruebabemovil-6ab32.appspot.com",
    messagingSenderId: "930273636551",
    appId: "1:930273636551:web:5c3dfd01a76b88ba794ee2",
    measurementId: "G-KYY0VHMZSJ"
  };



  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }
  const db= firebase.firestore();
  export default {
   firebase,
   db   
  }