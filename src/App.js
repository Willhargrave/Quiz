import './App.css';
import firebase from "firebase/compat/app";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Quiz from './components/Quiz';
import MakeQuestion from './components/MakeQuestion';
import AnswerQuestions from './components/AnswerQuestions';


function App () {
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar> */}
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/createQuiz" element={<MakeQuestion/>} />
        <Route path="/quizes/" element={<AnswerQuestions/>} />
        <Route path="/quiz/:id" element={<Quiz/>} />
        </Routes>
        {/* </Navbar> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
