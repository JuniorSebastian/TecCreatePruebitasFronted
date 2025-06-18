// src/components/NavBar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function NavBar() {
  const [usuario, setUsuario] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuario = () => {
      const guardado = localStorage.getItem('usuario');
      if (guardado) {
        try {
          setUsuario(JSON.parse(guardado));
        } catch (e) {
          console.error('Error leyendo usuario:', e);
        }
      }
    };

    obtenerUsuario();

    const handleStorageChange = () => obtenerUsuario();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 z-10 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/perfil" className="text-2xl font-bold text-blue-700 tracking-tight">
          Presentador IA
        </Link>

        <div className="flex items-center space-x-6 relative">
          <Link to="/perfil" className="text-gray-700 hover:text-blue-700 font-medium">
            Mis Presentaciones
          </Link>

          {usuario && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu((prev) => !prev)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <span className="text-gray-700 font-medium hidden sm:block">
                  {usuario.nombre?.split(' ')[0]}
                </span>
                <img
                  src={usuario.foto}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full border border-gray-300 shadow-sm object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-avatar.png';
                  }}
                />
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-20">
                  <button
                    onClick={handleCerrarSesion}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
