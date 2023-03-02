import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Quiz from './components/Quiz';
import Quizes from './components/Quizes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
