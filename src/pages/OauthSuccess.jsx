import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OauthSuccess() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🔍 OAuth Success - URL actual:', window.location.href);
    console.log('🔍 OAuth Success - pathname:', window.location.pathname);
    console.log('🔍 OAuth Success - search:', window.location.search);
    
    // ✅ Detectar si hay doble slash en la URL
    if (window.location.pathname.includes('//oauth-success')) {
      console.warn('⚠️ DETECTADO DOBLE SLASH en la URL!');
      // Redirigir a la URL correcta
      const newUrl = window.location.href.replace('//oauth-success', '/oauth-success');
      console.log('🔧 Redirigiendo a URL corregida:', newUrl);
      window.location.replace(newUrl);
      return;
    }
    
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');
    const errorParam = params.get('error');

    console.log('📋 Parámetros recibidos:', { token: !!token, user: !!user, error: errorParam });

    if (errorParam) {
      console.error('❌ Error OAuth:', errorParam);
      setError(`Error de autenticación: ${errorParam}`);
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    if (token && user) {
      try {
        const usuario = JSON.parse(decodeURIComponent(user));
        console.log('✅ Usuario procesado:', usuario);
        
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        setTimeout(() => {
          if (usuario.rol === 'admin') {
            console.log('🛡️ Redirigiendo a admin dashboard');
            navigate('/admindashboard');
          } else {
            console.log('👤 Redirigiendo a perfil');
            navigate('/perfil');
          }
        }, 1500);
      } catch (e) {
        console.error("❌ Error al procesar usuario:", e);
        setError('Error procesando datos de usuario');
        setTimeout(() => navigate('/'), 3000);
      }
    } else {
      console.warn('⚠️ Parámetros faltantes, redirigiendo a home');
      setError('Parámetros de autenticación faltantes');
      setTimeout(() => navigate('/'), 3000);
    }
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Error de Autenticación</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirigiendo en unos segundos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Autenticando...</h2>
        <p className="text-gray-600">Procesando tu información y redirigiendo...</p>
      </div>
    </div>
  );
}
