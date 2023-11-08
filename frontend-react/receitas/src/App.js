import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './view/Login.js'; 
import Cadastro from './view/Cadastro.js'; 
import CadastroIngrediente from './view/CadastroIngrediente.js'
const App = () => {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastroIngrediente" element={<CadastroIngrediente />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
