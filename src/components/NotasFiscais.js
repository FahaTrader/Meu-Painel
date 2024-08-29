import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase'; // Certifique-se de que storage está configurado
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { saveAs } from 'file-saver';

const NotasFiscais = () => {
  const [notas, setNotas] = useState([]);
  const [novaNota, setNovaNota] = useState({
    descricao: '',
    valor: '',
    data: '',
    arquivo: null, // Adicione a propriedade para o arquivo
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchNotasFiscais = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'notasFiscais'));
        const notasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotas(notasData);
      } catch (error) {
        console.error('Erro ao buscar notas fiscais:', error);
      }
    };

    const fetchUploadedFiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'uploadedFiles'));
        const filesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUploadedFiles(filesData);
      } catch (error) {
        console.error('Erro ao buscar arquivos:', error);
      }
    };

    fetchNotasFiscais();
    fetchUploadedFiles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaNota({ ...novaNota, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNovaNota({ ...novaNota, arquivo: file });
  };

  const handleAddNota = async () => {
    try {
      let fileURL = '';
      
      if (novaNota.arquivo) {
        const fileRef = ref(storage, `uploads/${novaNota.arquivo.name}`);
        await uploadBytes(fileRef, novaNota.arquivo);
        fileURL = await getDownloadURL(fileRef);
      }

      const notaData = {
        descricao: novaNota.descricao,
        valor: novaNota.valor,
        data: novaNota.data,
        arquivoURL: fileURL,
      };

      await addDoc(collection(db, 'notasFiscais'), notaData);
      setNotas([...notas, notaData]);
      setNovaNota({ descricao: '', valor: '', data: '', arquivo: null });
    } catch (error) {
      console.error('Erro ao adicionar nota fiscal:', error);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `uploads/${file.name}`);
    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      const fileData = {
        name: file.name,
        url: downloadURL,
      };

      await addDoc(collection(db, 'uploadedFiles'), fileData);
      setUploadedFiles([...uploadedFiles, fileData]);
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
    }
  };

  const handleFileDownload = (file) => {
    saveAs(file.url, file.name);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Notas Fiscais</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Adicionar Nova Nota Fiscal</h3>
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={novaNota.descricao}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          name="valor"
          placeholder="Valor"
          value={novaNota.valor}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="date"
          name="data"
          value={novaNota.data}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleAddNota}>Adicionar Nota</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Arquivos Importados</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {uploadedFiles.map(file => (
            <li key={file.id} style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
              {file.name}
              <button onClick={() => handleFileDownload(file)} style={{ marginLeft: '10px' }}>
                Baixar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notas.map(nota => (
          <li key={nota.id} style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
            <strong>Descrição:</strong> {nota.descricao} <br />
            <strong>Valor:</strong> {nota.valor} <br />
            <strong>Data:</strong> {nota.data} <br />
            {nota.arquivoURL && (
              <a href={nota.arquivoURL} target="_blank" rel="noopener noreferrer">
                Visualizar Arquivo
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotasFiscais;
