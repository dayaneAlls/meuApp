import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import 'firebase/database';
import 'firebase/auth'

let firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
  };

// Initialize Firebase

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase;