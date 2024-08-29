// src/components/AddProduct.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddProduct = () => {
  const [productName, setProductName] = useState('');

  const addProduct = async () => {
    try {
      await addDoc(collection(db, 'products'), {
        name: productName,
      });
      setProductName('');
    } catch (e) {
      console.error('Erro ao adicionar produto: ', e);
    }
  };

  return (
    <div>
      <h2>Adicionar Produto</h2>
      <input 
        type="text" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)} 
        placeholder="Nome do Produto" 
      />
      <button onClick={addProduct}>Adicionar</button>
    </div>
  );
}

export default AddProduct;
