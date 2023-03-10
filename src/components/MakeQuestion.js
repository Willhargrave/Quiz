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

export default MakeQuestion