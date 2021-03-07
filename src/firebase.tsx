import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBkhqdzxy_tt25LeTUY4t3rwpjGUtSE-T4",
    authDomain: "snapchat-clone-b1c98.firebaseapp.com",
    projectId: "snapchat-clone-b1c98",
    storageBucket: "snapchat-clone-b1c98.appspot.com",
    messagingSenderId: "268889906489",
    appId: "1:268889906489:web:32f5f07e921c6fbc4b5ce8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebase.auth()

const storage = firebase.storage()

const provider = new firebase.auth.GoogleAuthProvider()

export {auth, db, storage, provider}