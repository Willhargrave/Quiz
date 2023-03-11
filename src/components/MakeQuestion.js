import firebase from "firebase/compat/app";
import React, { useState, useEffect } from "react"

function MakeQuestion(props) {
    const {firstChoice, secondChoice, thirdChoice, correct, question, uid} = props.question

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    const questionClass = user && uid === user.uid ? 'sent' : 'recieved';
    
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

export default MakeQuestion
