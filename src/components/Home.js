import React from "react"
import "../styles/Home.css"
import { db } from "../config";
import { uid } from 'uid';
import {useAuthState} from 'react-firebase-hooks/auth'
import { set, ref as sRef, serverTimestamp } from "firebase/database";
import { useState, useEffect } from "react";

const auth = firebase.auth()
const firestore = firebase.firestore()
function Home() {
const [user] = useAuthState(auth)
return(
    <div className="main">
       <div className="home-title">
        <h2>Welcome to quiz maker!</h2>
        <input type="text" value={todo} onChange={handleTodoChange} />
        <button onClick={writeToDatabase}>submit</button>
        <p>Make your own quiz to share with your friends and family, and even the whole world!🌍</p>
       </div>
    </div>
)
}

function questionDisplay() {
    const dummy = useRef();
    const questionsRef = firestore.collection('questions');
    const query = questionsRef.orderBy('createdAt')

    const [questions] = useCollectionData(query, {idField: 'id'})
    const[typeValue, setTypeValue] = useState('')
    const[questionValue, setQuestionValue] = useState('')
    const timestamp = serverTimestamp();
    const setQuestion = async(e) => {
        e.preventDefault();
        const {uid} = auth.currentUser;
        await questionsRef.add({
            type: typeValue,
            question: questionValue,
            createdAt: timestamp,
            uid
        })
    }
    return (
        <div>
            <main>
                {questions && questions.map(qst => <MakeQuestion key={qst.id} question={qst} />)}
                <div ref={dummy}></div>
            </main>
            <form onSubmit={setQuestion}>
                <input value={typeValue} onChange={(e) => setTypeValue(e.target.value)}/>
                <input value={questionValue} onChange={(e) => setQuestionValue(e.target.value)}/>
            </form>
        </div>
    )
}

function MakeQuestion(props) {
    const {text, uid} = props.question

    const questionClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
    return (
        <div className={`question ${questionClass}`}>
            <p>{type}: {question}</p>
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


