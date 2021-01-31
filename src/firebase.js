import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBNIAbgs_1ywZ52GNYPb5bEf3Hi851pYgc",
    authDomain: "react-my-burger-9676f.firebaseapp.com",
    databaseURL: "https://react-my-burger-9676f.firebaseio.com",
    projectId: "react-my-burger-9676f",
    storageBucket: "react-my-burger-9676f.appspot.com",
    messagingSenderId: "551859769043",
    appId: "1:551859769043:web:1e4ea6163d843bc255ce26",
    measurementId: "G-LYT15SYF3W"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;