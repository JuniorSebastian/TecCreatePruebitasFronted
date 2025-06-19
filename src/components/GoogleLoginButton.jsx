import React from 'react';

export default function GoogleLoginButton() {
  const handleLogin = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    if (!apiUrl) {
      console.error('❌ No se encontró REACT_APP_API_URL en .env');
      alert('Error de configuración. Contacta al administrador.');
      return;
    }

    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center justify-center gap-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow px-6 py-3 font-semibold hover:bg-gray-50 transition"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
        alt="Google"
        className="w-5 h-5"
      />
      Iniciar sesión con Google
    </button>
  );
}
