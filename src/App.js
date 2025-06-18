import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Crear from './pages/Crear';
import PresentacionesList from './components/ListaPresentaciones';
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

        {/* Páginas protegidas con navbar */}
        <Route element={<LayoutConNavbar />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/crear" element={<Crear />} />
          <Route path="/crud" element={<PresentacionesList />} />
          <Route path="/crear-presentacion" element={<CrearPresentacion />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
