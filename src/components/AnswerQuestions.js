import React, {useState, useContext} from "react"
import QuestionContext from "./QuestionContext"
import "../styles/Home.css"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/analytics'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firestore = firebase.firestore();
const questionsRef = firestore.collection('questions');

  function AnswerQuestions() {
    const questions = useContext(QuestionContext);
    if (!questions) {
      // If questions is not yet loaded, return a loading indicator or null
      return <div>Loading...</div>;
    }
    const [score, setScore] = useState(0);
    const [displayNext, setDisplayNext] = useState(false);
    const { firstChoice, secondChoice, thirdChoice, correct, question, uid } = questions || {};
 
  const [user, setUser] = useState(null);
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
          <label htmlFor={`option-${index}`} className="option" id={`option-${index}-label`}>{choice}</label>
        </span>
      ))}

      <button onClick={() => checkAnswer(document.querySelector('input[type=radio]:checked'))}>Answer</button>

      <p>Score: {score}</p>

      {/* {displayNext && <button onClick={() => onNextQuestion(score)}>Next Question</button>} */}
    </div>
  );
}

export default AnswerQuestions;