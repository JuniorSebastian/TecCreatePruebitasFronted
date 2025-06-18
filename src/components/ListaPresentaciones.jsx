import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PresentacionCard from './PresentacionCard';
import NuevaPresentacion from './NuevaPresentacion';

const ListaPresentaciones = () => {
  const [presentaciones, setPresentaciones] = useState([]);

  const cargar = async () => {
    const res = await axios.get('http://localhost:3001/presentaciones');
    setPresentaciones(res.data);
  };

  const eliminar = async (id) => {
    await axios.delete(`http://localhost:3001/presentaciones/${id}`);
    cargar();
  };

  const editar = async (presentacion) => {
    const nuevoTitulo = prompt('Nuevo título:', presentacion.titulo);
    const nuevoContenido = prompt('Nuevo contenido:', presentacion.contenido);
    if (nuevoTitulo && nuevoContenido) {
      await axios.put(`http://localhost:3001/presentaciones/${presentacion.id}`, {
        titulo: nuevoTitulo,
        contenido: nuevoContenido
      });
      cargar();
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="space-y-6">
      <NuevaPresentacion onCreada={cargar} />
      {presentaciones.map(p => (
        <PresentacionCard
          key={p.id}
          presentacion={p}
          onEliminar={eliminar}
          onEditar={editar}
        />
      ))}
    </div>
  );
};

export default ListaPresentaciones;
