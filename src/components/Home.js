import React, {useRef, useState} from "react"
import "../styles/Home.css"
import firebase from "firebase/compat/app";
import 'firebase/analytics'
import { serverTimestamp } from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'

const auth = firebase.auth()
const firestore = firebase.firestore()
function Home() {
const [user] = useAuthState(auth)
return(
    <div className="main">
      {user ? <QuestionDisplay/> : <SignIn />}
    </div>
)
}

function QuestionDisplay() {
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


