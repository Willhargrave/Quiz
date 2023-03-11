import React, {useRef, useState} from "react"
import "../styles/Home.css"
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/analytics'
import { serverTimestamp } from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import QuestionDisplay from "./QuestionDisplay";
import {useAuthState} from 'react-firebase-hooks/auth'

const auth = firebase.auth()


function Home() {
const [user] = useAuthState(auth);
return(
    <div className="main">
      {user ? <QuestionDisplay/> : <SignIn />}
    </div>
)
}

function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
    return ( 
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
  }
    




export default Home


