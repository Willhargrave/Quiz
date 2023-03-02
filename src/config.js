import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyCoi2on2H2aEWKAwEMAFc1FOdARHHtzPiI",
    authDomain: "quiz-f26bf.firebaseapp.com",
    projectId: "quiz-f26bf",
    storageBucket: "quiz-f26bf.appspot.com",
    messagingSenderId: "1072697681604",
    appId: "1:1072697681604:web:bb6d38bae4bf2e89ffcb91",
    measurementId: "G-G47581V3YL"
  };
  
  // Initialize Firebase

  const app = firebase.initializeApp(config);
  export const db = app.firestore()

  export default config