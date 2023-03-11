import './App.css';
import firebase from "firebase/compat/app";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import config from "./config";
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import Quizes from './components/Quizes';


function App () {
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar> */}
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/quizes/" element={<Quizes/>} />
        <Route path="/quiz/:id" element={<Quiz/>} />
        </Routes>
        {/* </Navbar> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
