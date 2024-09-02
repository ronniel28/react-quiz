export default function Intro({questions, dispatch}){
    return(
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{questions.length} questions to test your React master</h3>
            <button className="btn btn-ui" onClick={() => dispatch({type: "startQuiz"})}>Let's Start</button>
        </div>
    )
}