import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './pages/map/map';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
