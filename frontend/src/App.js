import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Livedata from './pages/liveData/liveData';
import Main from './pages/main/main';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<Livedata />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
