import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Livedata from './pages/liveData/liveData';
import Main from './pages/main/main';
import Flowrate from './pages/flowRate/flowRate';
import Fixdata from './pages/fixData/fixData';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<Livedata />} />
        <Route path="/flowrate" element={<Flowrate />} />
        <Route path="/fixdata" element={<Fixdata />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
