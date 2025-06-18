import React from 'react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-2xl text-center border"
      >
        {/* Logo actualizado sin fondo y grande */}
        <img
          src="https://i.ibb.co/Q3JXxDPY/Chat-GPT-Image-13-jun-2025-22-14-04-removebg-preview-Photoroom.png"
          alt="TecCreate Logo"
          className="w-60 mx-auto mb-10"
        />

        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Bienvenido a TecCreate</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Inicia sesión con tu cuenta institucional de{' '}
          <span className="font-semibold text-blue-600">TECSUP</span>
        </p>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full bg-white border border-gray-300 hover:shadow-lg hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-300 text-lg"
        >
          <svg
            className="w-6 h-6 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.4-5.7 7.5-10.6 7.5-6.2 0-11.3-5-11.3-11.2S18.5 13 24.7 13c2.9 0 5.5 1.1 7.4 2.9l5.7-5.7C34 6.3 29.7 4.5 24.7 4.5 13.5 4.5 4.5 13.5 4.5 24.7S13.5 45 24.7 45c10.6 0 20.1-8.2 20.1-20 0-1.6-.2-2.8-.5-4.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.6l6.6 4.8c1.8-3.5 5.3-6.1 9.4-6.6V4.5c-6.4.6-11.8 4.5-16 10.1z"
            />
            <path
              fill="#4CAF50"
              d="M24.7 45c5 0 9.6-1.6 13.2-4.3l-6.1-5.1c-2.2 1.5-5 2.4-8 2.4-4.9 0-9-3.1-10.6-7.5l-6.5 5c3.9 5.6 10.2 9.5 17.5 9.5z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.1 5.1c.4-.4 7-5.3 7-15.2 0-1.6-.2-2.8-.5-4.5z"
            />
          </svg>
          Iniciar sesión con Google
        </button>

        <p className="mt-8 text-sm text-gray-400">
          Solo usuarios con correos{' '}
          <span className="text-blue-500 font-medium">@tecsup.edu.pe</span> pueden acceder.
        </p>
      </motion.div>
    </div>
  );
}
