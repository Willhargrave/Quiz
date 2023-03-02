import './App.css';
import { db } from './config';
import { uid } from 'uid';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import Quizes from './components/Quizes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { db } from './config';
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
