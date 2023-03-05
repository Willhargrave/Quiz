import React, {useRef, useState} from "react"
import "../styles/Home.css"
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/analytics'
import { serverTimestamp } from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import config from "../config";

firebase.initializeApp(config);
const auth = firebase.auth()
const firestore = firebase.firestore()
function Home() {
const [user] = useAuthState(auth);
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
    const[correctValue, setCorrectValue] = useState('')
    const[firstChoiceValue, setFirstChoiceValue] = useState('')
    const[secondChoiceValue, setSecondChoiceValue] = useState('')
    const[thirdChoiceValue, setThirdChoiceValue] = useState('')
    const[questionValue, setQuestionValue] = useState('')
    const timestamp = serverTimestamp();
    const setQuestion = async(e) => {
        e.preventDefault();
        const {uid} = auth.currentUser;
        await questionsRef.add({
            correct: correctValue,
            question: questionValue,
            firstChoice: firstChoiceValue,
            secondChoice: secondChoiceValue,
            thirdChoice: thirdChoiceValue,
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
                <input value={questionValue} placeholder="question"onChange={(e) => setQuestionValue(e.target.value)}/>
                <input value={correctValue} placeholder="correct answer" onChange={(e) => setCorrectValue(e.target.value)}/>
                <input value={firstChoiceValue} placeholder="wrong answer" onChange={(e) => setFirstChoiceValue(e.target.value)}/>
                <input value={secondChoiceValue} placeholder="wrong answer" onChange={(e) => setSecondChoiceValue(e.target.value)}/>
                <input value={thirdChoiceValue} placeholder="wrong answer" onChange={(e) => setThirdChoiceValue(e.target.value)}/>
                <button type="submit">Go</button>
           </form>
        </div>
    )
}

function MakeQuestion(props) {
    const {firstChoice, secondChoice, thirdChoice, correct, question, uid} = props.question

    const questionClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
    return (
        <div className={`question ${questionClass}`}>
            <div className="question-card">
            <div className="question">
            <p>Q: {question}</p>
            </div>
            <div className="choices">
            <p>{correct}</p>
            <p>{firstChoice}</p>
            <p>{secondChoice}</p>
            <p>{thirdChoice}</p>
            </div>
            </div>
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


