import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './CadastroForm.css';

const CadastroForm = () => {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [tipoMercado, setTipoMercado] = useState('');
  const [valor, setValor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedWhatsapp = `+55${whatsapp}`;

    try {
      await addDoc(collection(db, 'cadastros'), {
        nome,
        whatsapp: formattedWhatsapp,
        tipoMercado,
        valor,
      });
      setNome('');
      setWhatsapp('');
      setTipoMercado('');
      setValor('');
    } catch (err) {
      console.error('Erro ao adicionar o cadastro:', err);
    }
  };

  return (
    <div className="cadastro-container">
      <form onSubmit={handleSubmit} className="cadastro-form">
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Whatsapp:</label>
          <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Tipo de Mercado:</label>
          <input type="text" value={tipoMercado} onChange={(e) => setTipoMercado(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Valor:</label>
          <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroForm;
