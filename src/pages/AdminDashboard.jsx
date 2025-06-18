import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  AcademicCapIcon,
  DocumentChartBarIcon,
  CogIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [seccionActiva, setSeccionActiva] = useState('usuarios');

  useEffect(() => {
  const timeout = setTimeout(() => {
    const storedUser = localStorage.getItem('usuario');
    const usuario = storedUser ? JSON.parse(storedUser) : null;

    if (!usuario || usuario.rol !== 'admin') {
      navigate('/perfil');
    } else {
      setAdmin(usuario);
      fetch('http://localhost:3001/admin/usuarios', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const hoy = new Date().toISOString();
            const adminData = {
              nombre: usuario.nombre,
              correo: usuario.correo,
              foto: usuario.foto,
              titulo: null,
              fecha_creacion: hoy,
              estado: 'ADMIN'
            };
            const sinAdmin = data.filter(u => u.correo !== usuario.correo);
            setUsuarios([adminData, ...sinAdmin]);
          } else {
            setUsuarios([]);
          }
        })
        .catch(err => {
          console.error('Error al obtener usuarios:', err);
          setUsuarios([]);
        });
    }
  }, 100);

  return () => clearTimeout(timeout);
}, [navigate]);


  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const exportarCSV = () => {
    const headers = ['Nombre', 'Email', 'Proyecto', 'Fecha'];
    const csvContent = [
      headers.join(','),
      ...usuarios.map(u => [
        u.nombre || '',
        u.correo || '',
        u.titulo || '',
        u.fecha_creacion ? new Date(u.fecha_creacion).toLocaleDateString() : ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios_tec_create.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filtrados = usuarios.filter(
    u =>
      u.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.correo?.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.titulo?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const menuItems = [
    { id: 'dashboard', label: 'Panel Principal', icon: DocumentChartBarIcon },
    { id: 'usuarios', label: 'Usuarios', icon: UserGroupIcon },
    { id: 'estudiantes', label: 'Estudiantes', icon: AcademicCapIcon },
    { id: 'configuracion', label: 'Configuración', icon: CogIcon }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col justify-between">
        <div>
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">TEC CREATE</h1>
                <p className="text-xs text-gray-500">Panel Admin</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setSeccionActiva(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    seccionActiva === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                  {item.id === 'usuarios' && (
                    <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {usuarios.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Perfil Admin + Cerrar sesión */}
        {admin && (
          <div className="p-4 border-t flex items-center gap-3">
            <img
              src={admin.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.nombre)}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.nombre)}`;
              }}
              alt={admin.nombre}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">{admin.nombre}</p>
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Admin</span>
            </div>
            <button
              onClick={cerrarSesion}
              className="text-red-600 hover:text-red-800 transition"
              title="Cerrar sesión"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 pt-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
            <p className="text-gray-600">Administra los usuarios de TEC CREATE</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportarCSV}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o proyecto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proyecto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtrados.map((usuario, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={usuario.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nombre)}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nombre)}`;
                        }}
                        alt={usuario.nombre}
                        className="w-8 h-8 rounded-full object-cover mr-3"
                      />
                      <span className="text-sm font-medium text-gray-900">{usuario.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{usuario.titulo || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {usuario.fecha_creacion ? new Date(usuario.fecha_creacion).toLocaleDateString('es-ES') : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{usuario.correo}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      usuario.estado === 'ADMIN'
                        ? 'bg-blue-100 text-blue-800'
                        : usuario.titulo
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {usuario.estado || (usuario.titulo ? 'Activo' : 'Inactivo')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtrados.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron usuarios</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Mostrando {filtrados.length} de {usuarios.length} usuarios
        </div>
      </main>
    </div>
  );
}
