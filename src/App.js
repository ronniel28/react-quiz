
import { useEffect, useReducer } from 'react';
import Header from './Header'
import Loader from './Loader'
import Main from './Main';
import Error from './Error';
import Question from './Question';
import Intro from './Intro';



function App() {

  const initialState ={
    questions: [],
    status: "loading",
    questionNum : null,
    optionSelected: null
  }

  function reducer(state, action){
    switch(action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return {
          ...state,
          status: "error"
        };
      case "startQuiz":
        return {
          ...state,
          status: "active",
          questionNum: 0
        };
      case "chooseOption":
        return {
          ...state,
          optionSelected : action.payload
        }
      default:
        throw new Error ("Unknown Action")
    }
  }

  const [{questions, status, questionNum, optionSelected}, dispatch] = useReducer(reducer, initialState);

  useEffect(function(){
    fetch('http://localhost:3000/questions')
    .then((res) => res.json())
    .then((data) => dispatch({type: "dataReceived", payload: data}))
    .catch((err) => dispatch({type: "dataFailed"}))
  },[])

  return (
    <div className="app">
      <div>
        <Header />
        <Main>
          {status === 'loading' && <Loader/>}
          {status === 'error' && <Error/>}
          {status === 'ready' && <Intro questions={questions} dispatch={dispatch}/>}
          {status === 'active' && 
          <>
            <Question>
              {questions.map((question, index) => questionNum === index ?
              <div key={index}>
               <h4 className=''>{question.question}</h4> 
               <div className='options'>
                {question.options.map((option, i) => 
                  <div key={i}>
                    {optionSelected || optionSelected === 0 ? <button className={"btn btn-option " + (i === question.correctOption ? "correct" : "wrong")} disabled>{option}</button> : <button className='btn btn-option' onClick={() => dispatch({type: "chooseOption", payload : i})}>{option}</button>}
                  </div> 
                )}
               </div>
              </div>
               : '')}
            </Question>
            
          </>

          }
        </Main>

      </div>
    </div>
  );
}
export default App;
