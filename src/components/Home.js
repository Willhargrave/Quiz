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
                {questions && questions.map(qst => <AnswerQuestions key={qst.id} question={qst} />)}
                <div ref={dummy}></div>
            </main>
            <form onSubmit={setQuestion}>
                <div className="question-card">
                    <div>
                <input value={questionValue} placeholder="question"onChange={(e) => setQuestionValue(e.target.value)}/>
                </div>
                <div>
                <input value={correctValue} placeholder="correct answer" onChange={(e) => setCorrectValue(e.target.value)}/>
                <input value={firstChoiceValue} placeholder="wrong answer" onChange={(e) => setFirstChoiceValue(e.target.value)}/>
                <input value={secondChoiceValue} placeholder="wrong answer" onChange={(e) => setSecondChoiceValue(e.target.value)}/>
                <input value={thirdChoiceValue} placeholder="wrong answer" onChange={(e) => setThirdChoiceValue(e.target.value)}/>
                </div>
                <button type="submit">Go</button>
                </div>
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
  
    return (
      <div>
        <p>Q: {question}</p>
  
        <span>
          <input type="radio" id="option-one" name="option" className="radio" value={firstChoice} />
          <label htmlFor="option-one" className="option" id="option-one-label">
            {firstChoice}
          </label>
        </span>
  
        <span>
          <input type="radio" id="option-two" name="option" className="radio" value={correct} />
          <label htmlFor="option-two" className="option" id="option-two-label">
            {correct}
          </label>
        </span>
  
        <span>
          <input type="radio" id="option-three" name="option" className="radio" value={secondChoice} />
          <label htmlFor="option-three" className="option" id="option-three-label">
            {secondChoice}
          </label>
        </span>
  
        <span>
          <input type="radio" id="option-four" name="option" className="radio" value={thirdChoice} />
          <label htmlFor="option-four" className="option" id="option-four-label">
            {thirdChoice}
          </label>
        </span>
  
        <button onClick={() => checkAnswer(document.querySelector('input[type=radio]:checked'))}>answer</button>
  
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


