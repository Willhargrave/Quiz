import React, { useState, useEffect, useRef  } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { serverTimestamp } from 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import QuestionDisplay from "./QuestionDisplay";
import AnswerQuestions from "./AnswerQuestions";
import { Link } from "react-router-dom";
const auth = firebase.auth()
const firestore = firebase.firestore();

function MakeQuestion() {
    const dummy = useRef();
    const questionsRef = firestore.collection('questions');
    const query = questionsRef.orderBy('createdAt')
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
    <main>
        {questions && questions.map(qst => <QuestionDisplay key={qst.id} question={qst} />)}
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
   <div>
   <Link to="/quizes/">Link
  <AnswerQuestions questions={questions} />
</Link>
   </div>
</div>
  );
}

export default MakeQuestion;



