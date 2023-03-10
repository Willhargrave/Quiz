import firebase from "firebase/compat/app";
import React, {useState} from "react"
import "../styles/Home.css"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/analytics'


function AnswerQuestions({question: questionData}) {
    const { firstChoice, secondChoice, thirdChoice, correct, question } = questionData || {};
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
        {displayNext && <button onClick={() => questionData.onNextQuestion(score)}>Next Question</button>}
      </div>
    );
  }

  export default AnswerQuestions;