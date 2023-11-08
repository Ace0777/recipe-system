import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './view/Login.js'; 

const App = () => {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
