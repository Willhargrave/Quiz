import React, {useState} from "react"
import "../styles/Home.css"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/analytics'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firestore = firebase.firestore();
const questionsRef = firestore.collection('questions');

function AnswerQuestions({question: questionData}) {
 
  const [score, setScore] = useState(0);
  const [displayNext, setDisplayNext] = useState(false);
   
  const { firstChoice, secondChoice, thirdChoice, correct, question, uid } = questionData || {};
 
  
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
  
  // const choices = [firstChoice, secondChoice, thirdChoice, correct].sort(() => Math.random() - 0.5);

  return (
    <div>
      <p>Q: {question}</p>
       <div className="choices">
          <p>{correct}</p>
          <p>{firstChoice}</p>
          <p>{secondChoice}</p>
          <p>{thirdChoice}</p>
        </div>

      <button onClick={() => checkAnswer(document.querySelector('input[type=radio]:checked'))}>Answer</button>

      <p>Score: {score}</p>

      {/* {displayNext && <button onClick={() => onNextQuestion(score)}>Next Question</button>} */}
    </div>
  );
}

export default AnswerQuestions;