import firebase from "firebase/compat/app";
import React, {useEffect, useRef, useState} from "react"
import {useAuthState} from 'react-firebase-hooks/auth'
import "../styles/Home.css"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/analytics'
import QuestionDisplay from "./QuestionDisplay";


function Home() {
const [user] = useAuthState(firebase.auth());
const [question, setQuestion] = useState(null)

useEffect(() => {
    const firestore = firebase.firestore();
    const questionsRef = firestore.collection("questions");
    questionsRef.onSnapshot((snapshot) => {
        const questions = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setQuestion(questions[0])
    })
}, []);
return(
    <div className="main">
      {user ? <QuestionDisplay question={question}/> : <SignIn />}
    </div>
)
}

function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    }
    return ( 
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
  }
    




export default Home


