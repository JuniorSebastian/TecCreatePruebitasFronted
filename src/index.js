import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 🔧 Corregir doble slash inicial en la URL antes de montar React
if (window.location.pathname.startsWith('//')) {
  const newPath = window.location.pathname.replace(/^\/+/, '/'); // elimina doble slash inicial
  const newUrl = newPath + window.location.search;
  console.log('🔧 Corrigiendo URL de doble slash:', newUrl);
  window.location.replace(newUrl);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
