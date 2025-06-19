import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  obtenerPresentacionPorId,
  actualizarPresentacion,
  eliminarPresentacion,
} from '../services/api';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [outline, setOutline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPresentacion = async () => {
      try {
        const data = await obtenerPresentacionPorId(id);
        setTitulo(data.titulo || '');

        const contenido = typeof data.contenido === 'string'
          ? JSON.parse(data.contenido)
          : data.contenido;

        if (Array.isArray(contenido)) {
          setOutline(contenido);
        } else if (contenido?.outline) {
          setOutline(contenido.outline);
        } else {
          setOutline([]);
        }
      } catch (err) {
        console.error(err);
        alert('No se pudo cargar la presentación');
        navigate('/perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchPresentacion();
  }, [id, navigate]);

  const handleGuardarCambios = async () => {
    if (!titulo.trim()) return alert('El título no puede estar vacío');

    try {
      await actualizarPresentacion(id, {
        titulo,
        contenido: JSON.stringify({ outline }),
      });

      alert('Cambios guardados con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al guardar');
    }
  };

  const handleEliminar = async () => {
    const confirmar = window.confirm('¿Deseas eliminar esta presentación?');
    if (!confirmar) return;

    try {
      await eliminarPresentacion(id);
      alert('Presentación eliminada');
      navigate('/perfil');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Cargando presentación...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Editor de Presentación</h1>

      <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full border p-3 rounded mb-6 shadow-sm"
        placeholder="Título de la presentación"
      />

      <label className="block text-sm font-medium text-gray-700 mb-2">Diapositivas</label>
      <div className="space-y-4 mb-6">
        {outline.map((card, index) => (
          <textarea
            key={index}
            value={card}
            onChange={(e) => {
              const updated = [...outline];
              updated[index] = e.target.value;
              setOutline(updated);
            }}
            className="w-full p-3 border rounded shadow-sm"
            placeholder={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={handleGuardarCambios}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Guardar Cambios
        </button>
        <button
          onClick={handleEliminar}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Eliminar
        </button>
        <button
          onClick={() => navigate('/perfil')}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
