import React, { useState } from 'react';
import axios from 'axios';

const NuevaPresentacion = ({ onCreada }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nueva = { titulo, contenido };
      await axios.post('http://localhost:3001/presentaciones', nueva);
      onCreada();
      setTitulo('');
      setContenido('');
    } catch (error) {
      console.error('Error al crear presentación', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-lg space-y-4">
      <input
        type="text"
        placeholder="Título"
        className="w-full p-2 border rounded"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <textarea
        placeholder="Contenido"
        className="w-full p-2 border rounded"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        required
      />
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">Crear</button>
    </form>
  );
};

export default NuevaPresentacion;
