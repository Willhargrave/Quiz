import firebase from "firebase/compat/app";
import App from "../App";
import React, { useState, useEffect } from "react";
import "firebase/compat/firestore";
import { Link } from "react-router-dom";
function QuestionDisplay({question: questionData}) {
  const { firstChoice, secondChoice, thirdChoice, correct, question, uid } = questionData;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const questionClass =
    user && uid === user.uid ? "sent" : "recieved";

  const firestore = App.firestore();
  const questionsRef = firestore.collection("questions");

  function deleteQuestion() {
    questionsRef.doc(questionData.id).delete();
  }

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
        {user && uid === user.uid && (
          <button onClick={deleteQuestion}>Delete</button>
        )}
      </div>
      <Link to="/">Make new quiz</Link>
    </div>
  );
}

export default QuestionDisplay;