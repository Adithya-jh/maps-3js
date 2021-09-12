import firebase from 'firebase/compat/app';
// import firebase from "firebase/app";
// import 'firebase/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAgsqeAffLFVPJE7iQBH0-v4fmAkoHm0jw",
    authDomain: "maps-3js.firebaseapp.com",
    projectId: "maps-3js",
    storageBucket: "maps-3js.appspot.com",
    messagingSenderId: "838403051876",
    appId: "1:838403051876:web:5c92dd590f66b910812a71",
    measurementId: "G-DHCJSQLNVT"
  };


// if (!firebase.app.length) {
//     firebase.initializeApp(firebaseConfig);
//  }else {
//     firebase.app(); // if already initialized, use that one
//  }
firebase.initializeApp(firebaseConfig)

// const projectFirestore = firebase.firestore()
const projectStorage = firebase.storage()

export {projectStorage}