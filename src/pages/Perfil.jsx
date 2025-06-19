// src/pages/Perfil.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { obtenerMisPresentaciones } from '../services/api'; // ✅ import desde servicios

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 backdrop-blur-sm">
      <div className="bg-white/60 rounded-3xl px-10 py-12 shadow-2xl flex flex-col items-center animate-fade-in-up">
        <img
          src="https://i.ibb.co/Q3JXxDPY/Chat-GPT-Image-13-jun-2025-22-14-04-removebg-preview-Photoroom.png"
          alt="TecCreate logo"
          className="w-52 md:w-64 mb-6 drop-shadow-xl animate-bounce-slow"
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 text-center mb-2 tracking-tight">
          TecCreate
        </h1>
        <p className="text-blue-600 font-medium text-base md:text-lg text-center max-w-xs">
          Cargando tu cuenta...
        </p>
      </div>
    </div>
  );
}

function SidebarLink({ icon, text, active }) {
  return (
    <button
      className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left font-medium transition ${
        active
          ? 'bg-blue-100 text-blue-700 font-semibold'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
}

export default function Perfil() {
  const location = useLocation();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [presentaciones, setPresentaciones] = useState([]);
  const [cargandoPresentaciones, setCargandoPresentaciones] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const nombre = searchParams.get('nombre');
    const email = searchParams.get('email');
    const rol = searchParams.get('rol');
    const foto = searchParams.get('foto');

    if (token && nombre && email && rol) {
      const userData = { nombre, email, rol, foto };
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(userData));
      setUsuario(userData);
      window.history.replaceState({}, document.title, '/perfil');
    } else {
      const savedUser = localStorage.getItem('usuario');
      if (savedUser) setUsuario(JSON.parse(savedUser));
    }

    setTimeout(() => setLoading(false), 800);
  }, [location]);

  useEffect(() => {
    const fetchPresentaciones = async () => {
      setCargandoPresentaciones(true);
      try {
        const res = await obtenerMisPresentaciones();
        const data = res.data;
        setPresentaciones(data);

        if (location.state?.nuevaPresentacion) {
          setMensajeExito('¡Presentación creada con éxito!');
          navigate('/perfil', { replace: true });
        }
      } catch (error) {
        console.error('Error al obtener presentaciones', error);
      } finally {
        setCargandoPresentaciones(false);
      }
    };

    if (usuario) fetchPresentaciones();
  }, [usuario, location.state, navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const handleCrearConIA = () => {
    navigate('/crear-presentacion');
  };

  if (loading) return <LoadingScreen />;

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 to-blue-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No autenticado</h2>
          <p className="text-gray-600">Por favor inicia sesión primero.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-white via-blue-50 to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl border-r p-6 space-y-6 flex flex-col justify-between">
        <div>
          <img
            src="https://i.ibb.co/Q3JXxDPY/Chat-GPT-Image-13-jun-2025-22-14-04-removebg-preview-Photoroom.png"
            alt="TecCreate Logo"
            className="w-32 mx-auto mb-6"
          />
          <nav className="space-y-3">
            <SidebarLink icon="📄" text="Todos mis Creates" active />
            <SidebarLink icon="📑" text="Plantillas" />
            <SidebarLink icon="🎨" text="Temas" />
            <SidebarLink icon="🔤" text="Fuentes Personalizadas" />
            <SidebarLink icon="📬" text="Contáctanos" />
          </nav>
        </div>
        <button
          onClick={cerrarSesion}
          className="flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
              <img src={usuario.foto} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">{usuario.nombre}</p>
              <button className="text-sm text-blue-600 hover:underline font-medium">
                Gestionar cuenta
              </button>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Todos mis Creates</h2>
        </div>

        {/* Éxito */}
        {mensajeExito && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 border border-green-300 shadow">
            {mensajeExito}
          </div>
        )}

        {/* Presentaciones */}
        {cargandoPresentaciones ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-blue-600 font-semibold animate-pulse text-lg">
              Cargando presentaciones...
            </div>
          </div>
        ) : presentaciones.length === 0 ? (
          <div className="flex-1 bg-white rounded-xl shadow-inner p-10 flex flex-col items-center justify-center text-center">
            <img
              src="https://i.ibb.co/p6h0bsw2/5219070.png"
              alt="sin presentaciones"
              className="w-64 mb-6 opacity-90"
            />
            <h3 className="text-xl font-bold text-gray-700 mb-2">Aún no tienes Creates</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Empieza creando una presentación desde cero o utiliza nuestra inteligencia artificial para generarla por ti.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleCrearConIA}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Crear nuevo (AI)
              </button>
              <button className="bg-gray-200 px-6 py-2 rounded-full hover:bg-gray-300 transition font-medium">
                Crear desde cero
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentaciones.map((pres) => (
              <div
                key={pres.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-2">{pres.titulo}</h4>
                <p className="text-sm text-gray-600 mb-3">{pres.descripcion || 'Sin descripción'}</p>
                <button
                  onClick={() => navigate(`/presentacion/${pres.id}`)}
                  className="text-blue-600 font-medium hover:underline text-sm"
                >
                  Ver presentación →
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
