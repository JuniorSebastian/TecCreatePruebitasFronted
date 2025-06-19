// src/pages/CrearPresentacion.jsx
import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { crearPresentacion } from '../services/api';

const estilos = ['Default', 'Modern', 'Minimal'];
const idiomas = ['English', 'Spanish', 'French'];

export default function CrearPresentacion() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [slides, setSlides] = useState(4);
  const [estilo, setEstilo] = useState('Default');
  const [idioma, setIdioma] = useState('English');
  const [textLength, setTextLength] = useState('Medium');
  const [outline, setOutline] = useState([
    'Introduction to Topic',
    'Main Points',
    'Examples or Case Studies',
    'Conclusion',
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddCard = () => setOutline([...outline, '']);
  const handleRemoveCard = (index) => {
    const updated = [...outline];
    updated.splice(index, 1);
    setOutline(updated);
  };
  const handleOutlineChange = (value, index) => {
    const updated = [...outline];
    updated[index] = value;
    setOutline(updated);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      alert('Por favor ingresa un prompt');
      return;
    }

    try {
      setLoading(true);
      const res = await crearPresentacion({
        titulo: prompt,
        contenido: JSON.stringify(outline),
        idioma,
        plantilla: estilo,
        fuente: textLength,
        numero_slides: slides,
      });

      if (res?.id) {
        navigate(`/presentacion/${res.id}`);
      } else {
        throw new Error('No se recibió ID de presentación');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Hubo un problema al crear la presentación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-2">Generar</h1>
      <p className="text-center text-gray-700 text-lg mb-8">¿Qué quieres crear hoy?</p>

      {/* Prompt Section */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">Prompt</label>
        <div className="flex flex-wrap gap-4 mb-4">
          <select value={slides} onChange={(e) => setSlides(Number(e.target.value))} className="p-2 rounded border shadow-sm">
            {[2, 4, 6, 8].map(n => <option key={n} value={n}>{n} slides</option>)}
          </select>
          <select value={estilo} onChange={(e) => setEstilo(e.target.value)} className="p-2 rounded border shadow-sm">
            {estilos.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
          <select value={idioma} onChange={(e) => setIdioma(e.target.value)} className="p-2 rounded border shadow-sm">
            {idiomas.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="make a presentation for World War 2"
          className="w-full p-4 rounded border shadow-sm min-h-[100px]"
        />
      </div>

      {/* Outline Section */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">Outline</label>
        <div className="space-y-3">
          {outline.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded shadow-sm">
              <span className="font-bold text-gray-600 w-6">{index + 1}</span>
              <input
                type="text"
                value={item}
                onChange={(e) => handleOutlineChange(e.target.value, index)}
                className="flex-1 border rounded p-2 shadow-sm"
              />
              <button onClick={() => handleRemoveCard(index)} className="text-red-500">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleAddCard}
          className="mt-4 flex items-center gap-2 text-blue-600 font-medium hover:underline"
        >
          <PlusIcon className="w-5 h-5" /> Agregar tarjeta
        </button>
        <p className="text-sm text-gray-500 mt-1">{outline.length} tarjetas · {prompt.length}/20000 caracteres</p>
      </div>

      {/* Settings Section */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">Configuración</label>
        <p className="mb-2 text-gray-700">Cantidad de texto por tarjeta:</p>
        <div className="flex gap-4">
          {['Brief', 'Medium', 'Detailed'].map(option => (
            <button
              key={option}
              onClick={() => setTextLength(option)}
              className={`px-4 py-2 rounded-full border font-medium shadow-sm flex items-center gap-2 ${
                textLength === option ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Generando...' : 'Generar Presentación'}
        </button>
      </div>
    </div>
  );
}
