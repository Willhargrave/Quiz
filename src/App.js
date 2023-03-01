import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/quizes/" element={<Quizes/>} />
        <Route path="/quiz/:id" element={<Quiz/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
