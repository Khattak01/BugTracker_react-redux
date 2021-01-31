import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "******",
    authDomain: "******",
    databaseURL: "******",
    projectId: "*****",
    storageBucket: "*****",
    messagingSenderId: "*****",
    appId: "*****
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
