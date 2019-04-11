import firebase from "firebase";

var config = {
    apiKey: "AIzaSyDnlWSgm7FCsHEcwaJ5okurjoiqCp3sveY",
    authDomain: "irhyme-5e1f8.firebaseapp.com",
    databaseURL: "https://irhyme-5e1f8.firebaseio.com",
    projectId: "irhyme-5e1f8",
    storageBucket: "irhyme-5e1f8.appspot.com",
    messagingSenderId: "64042890464"
};
firebase.initializeApp(config);

export default firebase;