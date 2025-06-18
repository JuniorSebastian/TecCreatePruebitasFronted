import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OauthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      try {
        const usuario = JSON.parse(decodeURIComponent(user));
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        setTimeout(() => {
          if (usuario.rol === 'admin') {
            navigate('/admindashboard');
          } else {
            navigate('/perfil');
          }
        }, 100);
      } catch (e) {
        console.error("Error al procesar usuario:", e);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  return <div className="p-10 text-center text-gray-700">Autenticando y redirigiendo...</div>;
}
