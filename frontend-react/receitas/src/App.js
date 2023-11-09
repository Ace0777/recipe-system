import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './view/Login.js'; 
import Cadastro from './view/Cadastro.js'; 
import CadastroReceita from './view/CadastroReceita.js';
import CadastroIngrediente from './view/CadastroIngrediente.js';
import TelaPrincipal from './view/Principal.js';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/principal" element={<TelaPrincipal />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastroReceita" element={<CadastroReceita />} />
          <Route path="/cadastroIngrediente" element={<CadastroIngrediente />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
