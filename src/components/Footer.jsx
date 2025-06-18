// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-10 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-lg font-semibold">© {new Date().getFullYear()} TecCreate. Todos los derechos reservados.</p>
        <p className="text-sm mt-2 opacity-80">Hecho con ❤️ por estudiantes y docentes de TECSUP.</p>
      </div>
    </footer>
  );
}
