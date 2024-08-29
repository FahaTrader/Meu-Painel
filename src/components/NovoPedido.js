import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const NovoPedido = () => {
  const [pedido, setPedido] = useState({ cliente: '', produtos: [], valor: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "pedidos"), pedido);
      alert("Pedido criado com sucesso!");
    } catch (e) {
      console.error("Erro ao adicionar pedido: ", e);
    }
  };

  return (
    <div>
      <h2>Novo Pedido de Venda</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Cliente" 
          value={pedido.cliente} 
          onChange={(e) => setPedido({ ...pedido, cliente: e.target.value })} 
        />
        {/* Adicione lógica para adicionar produtos ao pedido */}
        <input 
          type="number" 
          placeholder="Valor" 
          value={pedido.valor} 
          onChange={(e) => setPedido({ ...pedido, valor: e.target.value })} 
        />
        <button type="submit">Criar Pedido</button>
      </form>
    </div>
  );
};

export default NovoPedido;
