import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const NovoOrcamento = () => {
  const [orcamento, setOrcamento] = useState({ cliente: '', valor: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "orcamentos"), orcamento);
      alert("Orçamento criado com sucesso!");
    } catch (e) {
      console.error("Erro ao adicionar orçamento: ", e);
    }
  };

  return (
    <div>
      <h2>Novo Orçamento</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Cliente" 
          value={orcamento.cliente} 
          onChange={(e) => setOrcamento({ ...orcamento, cliente: e.target.value })} 
        />
        <input 
          type="number" 
          placeholder="Valor" 
          value={orcamento.valor} 
          onChange={(e) => setOrcamento({ ...orcamento, valor: e.target.value })} 
        />
        <button type="submit">Criar Orçamento</button>
      </form>
    </div>
  );
};

export default NovoOrcamento;
