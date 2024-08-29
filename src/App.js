// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CadastroForm from './components/CadastroForm';
import VendasPage from './components/VendasPage';
import ClientPage from './components/ClientPage';
import NotasPage from './components/NotasPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/cadastros' element={<CadastroForm />} />
            <Route path='/vendas' element={<VendasPage />} />
            <Route path='/clientes' element={<ClientPage />} />
            <Route path='/fiscal' element={<NotasPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
