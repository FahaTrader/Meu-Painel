import React from 'react';
import Faturamento from './Faturamento';
import NovoOrcamento from './NovoOrcamento';
import NovoPedido from './NovoPedido';

const VendasPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Página de Vendas</h1>
      <Faturamento />
      <NovoOrcamento />
      <NovoPedido />
    </div>
  );
};

export default VendasPage;
