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


    
function AnswerQuestions(props) {
    const { firstChoice, secondChoice, thirdChoice, correct, question } = props.question;
    const [score, setScore] = useState(0);
    const [displayNext, setDisplayNext] = useState(false);
  
    function checkAnswer(selectedOption) {
      if (!selectedOption) {
        alert('Please select your answer.');
        return;
      }
  
      const answer = selectedOption.value;
  
      if (answer === correct) {
        setScore(score => score + 1);
      }
  
      setDisplayNext(true);
    }
    const choices = [firstChoice, secondChoice, thirdChoice, correct].sort(() => Math.random() - 0.5);
    return (
      <div>
        <p>Q: {question}</p>
  
        {choices.map((choice, index) => (
            <span key={index}>
                <input type="radio" id={`option-${index}`} name="option" className="radio" value={choice} />
                <label htmlFor={`option-${index}`} className="option" id={`option-${index}-label`}>
                {choice}
                </label>
            </span>
        ))}
  
        <button onClick={() => checkAnswer(document.querySelector('input[name="option"]:checked'))}>answer</button>
        <p>Score: {score}</p>
        {displayNext && <button onClick={() => props.onNextQuestion(score)}>Next Question</button>}
      </div>
    );
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


