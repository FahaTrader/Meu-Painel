// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartPie, FaUserAlt, FaChartLine, FaFileInvoiceDollar, FaCog, FaHandHoldingUsd } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <FaChartPie className="icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/cadastros">
            <FaUserAlt className="icon" /> Cadastros
          </Link>
        </li>
        <li>
          <Link to="/vendas">
            <FaChartLine className="icon" /> Vendas
          </Link>
        </li>
        <li>
          <Link to="/clientes">
            <FaHandHoldingUsd className="icon" /> Clientes
          </Link>
        </li>
        <li>
          <Link to="/fiscal">
            <FaFileInvoiceDollar className="icon" /> Fiscal
          </Link>
        </li>
        <li>
          <Link to="/configuracoes">
            <FaCog className="icon" /> Configurações
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
