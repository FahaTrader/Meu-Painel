// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="quick-access">
        <h2>Acesso Rápido</h2>
        <div className="sections">
          <div className="section">
            <h3>Cadastros</h3>
            <ul>
              <li>Novo produto</li>
              <li>Novo cliente</li>
              <li>Novo fornecedor</li>
            </ul>
          </div>
          <div className="section">
            <h3>Vendas</h3>
            <ul>
              <li>Faturamento</li>
              <li>Novo orçamento</li>
              <li>Fechamento de caixa</li>
            </ul>
          </div>
          <div className="section">
            <h3>Estoque</h3>
            <ul>
              <li>Nova movimentação</li>
              <li>Importar estoque</li>
              <li>Novo local de estoque</li>
            </ul>
          </div>
          {/* Adicione outras seções conforme necessário */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
