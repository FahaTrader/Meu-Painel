import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cadastros'));
        const clientesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setClientes(clientesData);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {clientes.map(cliente => (
          <li key={cliente.id} style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
            <strong>Nome:</strong> {cliente.nome} <br />
            <strong>Whatsapp:</strong> {cliente.whatsapp} <br />
            <strong>Tipo de Mercado:</strong> {cliente.tipoMercado} <br />
            <strong>Valor:</strong> {cliente.valor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientesList;
