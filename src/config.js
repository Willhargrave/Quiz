import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
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
  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app)

  export default config