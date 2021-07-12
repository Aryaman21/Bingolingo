import firebase from 'firebase';

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyBb06wbhaFbIyLYYROZa-rlesbtSkqO9Jg",
        authDomain: "bingolingo-a7a7e.firebaseapp.com",
        projectId: "bingolingo-a7a7e",
        storageBucket: "bingolingo-a7a7e.appspot.com",
        messagingSenderId: "642232279482",
        appId: "1:642232279482:web:0641989f45219d9c757d83",
        measurementId: "G-JLJBFBMXT2"
    }
);
  // Initialize Firebase
  const db = firebaseApp.firestore();

  export default db;