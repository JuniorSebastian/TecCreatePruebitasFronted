import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Crear from './pages/Crear';
import ListaPresentaciones from './components/ListaPresentaciones';
import LayoutConNavbar from './components/LayoutConNavbar';
import LoginPage from './pages/LoginPage';
import Perfil from './pages/Perfil';
import AdminDashboard from './pages/AdminDashboard';
import CrearPresentacion from './pages/CrearPresentacion';
import Editor from './pages/Editor';
import OauthSuccess from './pages/OauthSuccess';

import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth-success" element={<OauthSuccess />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/presentacion/:id" element={<Editor />} />

        {/* Páginas protegidas con layout/navbar */}
        <Route element={<LayoutConNavbar />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/crud" element={<ListaPresentaciones />} />
          <Route path="/crear-presentacion" element={<CrearPresentacion />} />
        </Route>

        {/* Ruta catch-all para rutas no encontradas */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Ruta no encontrada</h2>
              <p className="text-gray-600 mb-2">
                URL actual: <code>{window.location.pathname + window.location.search}</code>
              </p>
              <p className="text-sm text-gray-500">
                Si llegaste aquí desde Google OAuth, contacta al administrador.
              </p>
              <button
                onClick={() => (window.location.href = '/')}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Ir al inicio
              </button>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
