import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import 'firebase/database';
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyCRzQzsaG-2TLIwApM2RWN82oANB4vBjwg",
    authDomain: "meuapp-edc79.firebaseapp.com",
    databaseURL: "https://meuapp-edc79-default-rtdb.firebaseio.com",
    projectId: "meuapp-edc79",
    storageBucket: "meuapp-edc79.appspot.com",
    messagingSenderId: "631671880051",
    appId: "1:631671880051:web:f3b811dcf178e18eccad06"
  };

// Initialize Firebase

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase;