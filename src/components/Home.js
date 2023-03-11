import firebase from "firebase/compat/app";
import React, {useRef, useState} from "react"
import {useAuthState} from 'react-firebase-hooks/auth'
import "../styles/Home.css"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/analytics'
import QuestionDisplay from "./QuestionDisplay";


function Home() {
const [user] = useAuthState(firebase.auth());
return(
    <div className="main">
      {user ? <QuestionDisplay question={props.question}/> : <SignIn />}
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


